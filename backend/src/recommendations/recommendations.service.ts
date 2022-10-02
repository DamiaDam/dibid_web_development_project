import { Injectable, Logger } from '@nestjs/common';
import { randomInt } from 'crypto';
import { ProductItemService } from 'src/db/productItem/productItem.service';
import { UserService } from 'src/db/user/user.service';
import { XMatrixService } from 'src/db/xmatrix/xmatrix.service';
import { XMatrixPredService } from 'src/db/xmatrixpred/xmatrixpred.service';

@Injectable()
export class RecommendationsService {
  private readonly logger = new Logger(RecommendationsService.name);
  keystorePath: string;

  constructor(
    private userService: UserService,
    private productItemService: ProductItemService,
    private xMatrixService: XMatrixService,
    private xMatrixPredService: XMatrixPredService
  ) { }

  async createRecommendationsMatrix() {
  }

    async matrixFactorization() {
        console.log(await this.xMatrixService.getXMatrix('admin', 1));
        console.log(await this.xMatrixService.setXMatrixVal('admin', 1, 1));
    }

    async matrixFactorizationAlgorithm() {

        // drop table xmatrixpred
        await this.xMatrixPredService.clearXMatrixPred();

        const latent_features: number = 10;
        const learning_rate: number = 0.00013;

        const xMatrix = await this.xMatrixService.getAllXMatrix();
        const allUsers = await this.userService.findAll();
        const allProducts = await this.productItemService.getAllProductIds();


        var userRef = new Map();
        for (let i = 0; i < allUsers.length; i++) {
            userRef.set(allUsers[i].username, i);
        }

        var reverseUserRef = new Map();
        for (let i = 0; i < allUsers.length; i++) {
            reverseUserRef.set(i, allUsers[i].username);
        }

        var productRef = new Map();
        for (let i = 0; i < allProducts.length; i++) {
            productRef.set(allProducts[i], i);
        }

        var reverseProductRef = new Map();
        for (let i = 0; i < allProducts.length; i++) {
            reverseProductRef.set(i, allProducts[i]);
        }

        // create V
        var vMatrix = this.createTable(allUsers.length, latent_features);
        var fMatrix = this.createTable(latent_features, allProducts.length);

        var newRMSE: number = Number.MAX_SAFE_INTEGER-1;
        var oldRMSE: number = Number.MAX_SAFE_INTEGER;

        var i=0;
        while(newRMSE < oldRMSE) {
        // while(i < 500000) {
            i++;
            oldRMSE = newRMSE;

            var totalEsq: number = 0;
            var knownElemCount: number = 0;

            for (const elem of xMatrix) {
                // get i,j depending on user, product and their reftables

                var iIndex = userRef.get(elem.username);
                var jIndex = productRef.get(elem.productId);

                var e = this.compute_e(elem.rating, vMatrix, fMatrix, iIndex, jIndex, latent_features);

                totalEsq = totalEsq+(e*e);
                knownElemCount = knownElemCount+1;
                vMatrix = this.update_v_matrix(vMatrix, fMatrix, learning_rate, e, iIndex, jIndex, latent_features);
                fMatrix = this.update_f_matrix(vMatrix, fMatrix, learning_rate, e, iIndex, jIndex, latent_features);
            }

            newRMSE = totalEsq / knownElemCount;
        }
        await this.calculate_store_x_pred(vMatrix, fMatrix, reverseUserRef, reverseProductRef);
        console.log('Matrix Factorization OK');
    }

    createTable(x: number, y: number): [number[]] {

        var table: [number[]] = [[]];

        for (let i = 0; i < x; i++) {

            table[i] = []

            for (let j = 0; j < y; j++) {
                table[i][j] = randomInt(1,5);
            }
        }
        
        return table;
    }

    compute_x_pred(vMatrix: [number[]], fMatrix: [number[]], iIndex: number, jIndex: number, kLatent: number) {

        let val=0;
        for(let n=0; n<kLatent; n++) {
            val = val + vMatrix[iIndex][n] * fMatrix[n][jIndex];
        }

        return val;
    }

    compute_e(knownRating: number, vMatrix: [number[]], fMatrix: [number[]], iIndex: number, jIndex: number, kLatent: number) {
        return knownRating - this.compute_x_pred(vMatrix, fMatrix, iIndex, jIndex, kLatent);
    }

    update_v_matrix(
        vMatrix: [number[]], fMatrix: [number[]], learning_rate: number,
        e: number, iIndex: number, jIndex: number, latent_features: number)
    {

        for(let k=0; k< latent_features; k++) {
            vMatrix[iIndex][k] = vMatrix[iIndex][k] - learning_rate*vMatrix[iIndex][k]*0.02 + learning_rate * 2 * e * fMatrix[k][jIndex];
        }
        return vMatrix;
    }

    update_f_matrix(
        vMatrix: [number[]], fMatrix: [number[]], learning_rate: number,
        e: number, iIndex: number, jIndex: number, latent_features: number)
    {
        for(let k=0; k< latent_features; k++) {
            fMatrix[k][jIndex] = fMatrix[k][jIndex]  + learning_rate*( 2 * e * vMatrix[iIndex][k] - fMatrix[k][jIndex]*0.02);
        }
        return fMatrix;
    }

    async calculate_store_x_pred(vMatrix: [number[]], fMatrix: [number[]], reverseUserRef: Map<number, string>, reverseProductRef: Map<number, number>) {
        for(let i=0; i<vMatrix.length; i++) {
            for(let j=0; j<fMatrix[0].length; j++) {
                let sum = 0;
                for(let k=0; k<vMatrix[0].length; k++) {
                    sum += vMatrix[i][k] * fMatrix[k][j];
                }
                await this.store_x_pred(sum, reverseUserRef, reverseProductRef, i, j);
            }
        }
    }

    async store_x_pred(rating: number, userRef: Map<number, string>, productRef: Map<number, number>, iIndex: number, jIndex: number) {

        const username: string = userRef.get(iIndex);
        const productId: number = productRef.get(jIndex);

        await this.xMatrixPredService.setXMatrixPredVal(username, productId, rating);
    }

    async getRecommendations(username: string): Promise<number[]> {
        return await this.xMatrixPredService.getXMatrixPredByUser(username);
    }

}