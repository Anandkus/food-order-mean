import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NoFoundComponent } from './layout/no-found/no-found.component';
import { SearchComponent } from './layout/search/search.component';
import { FormsModule } from '@angular/forms';
import { TagComponent } from './layout/tag/tag.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NoFoundComponent,
    SearchComponent,
    TagComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    NoFoundComponent,
    SearchComponent,
    TagComponent,
  ],
})
export class SharedModule {}
