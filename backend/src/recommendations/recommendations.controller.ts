import { Controller, Get, Headers, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { XMatrixService } from 'src/db/xmatrix/xmatrix.service';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
    constructor(
        private readonly recommendationsService: RecommendationsService,
        private readonly xmatrixService: XMatrixService,
        private readonly authService: AuthService
        ) { }


    @Get('/get')        
    @UseGuards(AuthGuard)
    async getUserRecommendations(
        @Headers('authorization') headers
    ): Promise<number[]> {

        let token: string = ""
        try {
            token = headers.split(" ")[1];
        }
        catch(err) {
            console.log(err);
            return [];
        }
        const username = this.authService.getUsername(token);

        return await this.recommendationsService.getRecommendations(username);
    }

    @Get('/update')
    async recommendations() {
        
        await this.recommendationsService.matrixFactorizationAlgorithm();

        return ({ success: true });
    }

    @Get('/view/:id')
    @UseGuards(AuthGuard)
    async increaseRatingView(
        @Param('id') productId: string,
        @Headers('authorization') headers
    ): Promise<{ success: boolean }> {

        console.log('headers', headers);
        let token: string = ""
        try {
            token = headers.split(" ")[1];
        }
        catch(err) {
            console.log(err);
            return {success: false};
        }

        const username = this.authService.getUsername(token);

        // increase xmatrixval by 3
        await this.xmatrixService.setXMatrixVal(username, +productId, 3);

        return ({ success: true });
    }

    @Get('/bid/:id')
    @UseGuards(AuthGuard)
    async increaseRatingBid(
        @Param('id') productId: string,
        @Headers('authorization') headers
    ): Promise<{ success: boolean }> {

        console.log('headers', headers);
        let token: string = ""
        try {
            token = headers.split(" ")[1];
        }
        catch(err) {
            console.log(err);
            return {success: false};
        }

        const username = this.authService.getUsername(token);

        // increase xmatrixval by 10
        await this.xmatrixService.setXMatrixVal(username, +productId, 10);

        return ({ success: true });
    }
}
