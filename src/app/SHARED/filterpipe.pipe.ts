import { Pipe, PipeTransform } from '@angular/core';
import { Ievent } from 'src/app/shared/cerebraapp-form.model';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(items: any[], searchText: any): any {    
    if(searchText){
      return items.filter(val => val.StudyNo.toLocaleString().includes(searchText) );
        //return items.filter(val => val.StudyNo.toLocaleString().indexOf(searchText) >= 0); 
    }else{
      return items;
    }
  }

}
