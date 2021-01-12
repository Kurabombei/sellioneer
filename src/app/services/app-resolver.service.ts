import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';
import { GoodsService } from './goods.service';
@Injectable()
export class AppResolverService implements Resolve<any>{
  constructor(public userService: UsersService,
              public goodService: GoodsService) { }

  resolve(route: ActivatedRouteSnapshot, ){
    return new Promise((resolve, reject) => {
      const userId = route.paramMap.get('id');
      if (this.userService.getUser(userId)){
        this.userService.getUser(userId)
          .subscribe(
            data => {
              resolve(data);
            }
          );
      }
      else{
        const goodId = route.paramMap.get('id');
        this.goodService.getGood(goodId)
          .subscribe(
            data => {
              resolve(data);
            }
          );
      }
      }
    );
  }
}
