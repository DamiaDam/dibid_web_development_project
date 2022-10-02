import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { xMatrix } from './xmatrix.entity';

@Injectable()
export class XMatrixService {
  keystorePath: string;

  constructor(
    @InjectRepository(xMatrix)
    private xmatrixRepository: Repository<xMatrix>,
  ) { }

  async getXMatrix(username: string, productId: number): Promise<xMatrix> {

    return await this.xmatrixRepository.findOne({
        where: {
          username: username,
          productId: productId
        }
      });
  }

  async getAllXMatrix(): Promise<xMatrix[]> {
    return await this.xmatrixRepository.find();
  }

  async setXMatrixVal(username: string, productId: number, value: number): Promise<void> {

    const xMatrixRes = await this.getXMatrix(username, productId);
    var oldValue: number = 0;
    var oldId: number;
    if(xMatrixRes !== null){
        oldId = xMatrixRes.id;
        oldValue = xMatrixRes.rating;
        await this.xmatrixRepository.save({id: oldId, username: username, productId: productId, rating: oldValue+value});
    }
    else{
        await this.xmatrixRepository.save({username: username, productId: productId, rating: oldValue+value});
    }

    return;
  }

}