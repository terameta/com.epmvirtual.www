import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library/library.component';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
	{ path: '', component: LibraryComponent },
	{ path: ':id', component: ArticleComponent }
];

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes )
	],
	declarations: [ LibraryComponent, ArticleComponent ]
} )
export class LibraryModule { }
