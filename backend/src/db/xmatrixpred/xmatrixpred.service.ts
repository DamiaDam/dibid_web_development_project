import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { xMatrixPred } from './xmatrixpred.entity';

@Injectable()
export class XMatrixPredService {
  keystorePath: string;

  constructor(
    @InjectRepository(xMatrixPred)
    private xmatrixPredRepository: Repository<xMatrixPred>,
  ) { }

  async getXMatrixPred(username: string, productId: number): Promise<xMatrixPred> {

    return await this.xmatrixPredRepository.findOne({
        where: {
          username: username,
          productId: productId
        }
      });
  }

  async getAllXMatrixPred(): Promise<xMatrixPred[]> {
    return await this.xmatrixPredRepository.find();
  }

  async clearXMatrixPred(): Promise<void> {
    return await this.xmatrixPredRepository.clear();
  }

  async setXMatrixPredVal(username: string, productId: number, value: number): Promise<void> {

    const xMatrixRes = await this.getXMatrixPred(username, productId);
    var oldId: number;
    if(xMatrixRes !== null){
        oldId = xMatrixRes.id;
        await this.xmatrixPredRepository.save({id: oldId, username: username, productId: productId, rating: value});
    }
    else{
        value = value;
        try {
          await this.xmatrixPredRepository.save({username: username, productId: productId, rating: value});
        }
        catch {
          await this.xmatrixPredRepository.save({username: username, productId: productId, rating: value % 2147483647});
        }
    }

    return;
  }

  async getXMatrixPredByUser(username: string): Promise<number[]> {

    const items: xMatrixPred[] = await this.xmatrixPredRepository.find({
        where: {
          username: username
        },
        order: {
          rating: "DESC",
        }
      }
    );

    const ids: number[] = []
    
    var fiveItems = items.slice(0, 5);

    fiveItems.forEach( (elem) => {ids.push(elem.productId)})

    return ids;
  }

}