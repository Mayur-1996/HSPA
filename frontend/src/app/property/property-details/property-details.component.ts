import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {

  public propertyID: number;
  property = new Property();
  data: Property;

  constructor(private route:ActivatedRoute, 
    private housingService:HousingService,
    private router:Router) { }

  ngOnInit() {
    this.propertyID = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      data =>{
        // this.property.Name = data.Name;
        // this.property.BHK = data.BHK;
        // this.property.PType = data.PType;
        // this.property.Price = data.Price;
        // this.property.City = data.City;
        // this.property.BuiltArea = data.BuiltArea;
        // this.property.Image = data.Image
        // this.property.FType = data.FType;
        // this.property.CarpetArea = data.CarpetArea

          this.property= data['prp']
      }
    );

    this.route.params.subscribe(
      (params)=>{
        this.propertyID = +params['id']
        this.housingService.getProperty(this.propertyID).subscribe( 
          data =>{
            this.property.Name = data.Name;
            this.property.BHK = data.BHK;
            this.property.PType = data.PType;
            this.property.Price = data.Price;
            this.property.City = data.City;
            this.property.BuiltArea = data.BuiltArea;
            this.property.Image = data.Image
            this.property.FType = data.FType;
            this.property.CarpetArea = data.CarpetArea
          }
    )
      }
    )
  }

 

}
