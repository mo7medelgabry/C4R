import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private api = 'https://6785618b1ec630ca33a86aca.mockapi.io/data';
  data: any = [];
  name: string = '';
  disc: string = '';
  location: string = '';
  imgtest: string = '';
  currentIndex: number = 0; 
  selectedItemIndex: number | null = null;
  isImageChanged: boolean = false;
  intervalId: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getdata();
    this.startAutoNavigation();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getdata(): void {
    this.http.get(this.api).subscribe(
      (response) => {
        this.data = response;
        this.name = this.data[0].name;
        this.disc = this.data[0].dic;
        this.imgtest = this.data[0].imgurl;
        this.location = this.data[0].location;
      },
      (error) => {
        console.error(error);
      }
    );
  }

startAutoNavigation(): void {
  this.intervalId = setInterval(() => {
    if (this.selectedItemIndex === null || this.selectedItemIndex === this.data.length - 1) {
      this.selectedItemIndex = 0;
    } else {
      this.selectedItemIndex++;
    }

    this.isImageChanged = true;
    setTimeout(() => {
      this.isImageChanged = false;
    }, 3000);

    this.updateSelectedItem(this.selectedItemIndex);
  }, 6000);
}


  updateSelectedItem(index: number): void {
    const item = this.data[index];
    this.name = item.name;
    this.disc = item.dic;
    this.location = item.location;
    this.imgtest = item.imgurl;
    this.selectedItemIndex = index;
    this.isImageChanged = true;

    setTimeout(() => {
      this.isImageChanged = false;
    }, 10000);
  }

  toggleActive(index: number, item: any): void {
    this.selectedItemIndex = index;
    this.updateSelectedItem(index);
  }


}