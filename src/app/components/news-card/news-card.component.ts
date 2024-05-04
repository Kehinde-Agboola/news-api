import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../services/newsapi.service';
import { Article } from 'src/app/modals/articule.modal';
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
})
export class NewsCardComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadArticles();
  }
  searchArticles() {
    if (this.searchTerm.trim() !== '') {
      this.currentPage = 1;
      console.log('Searching for:', this.searchTerm); // Log the search term
      this.loadArticles();
    }
  }

  loadArticles() {
    this.isLoading = true;
    this.newsService
      .getNewsArticles(this.searchTerm, this.currentPage, this.pageSize)
      .subscribe((articles: Article[]) => {
        this.articles = articles;
        this.isLoading = false;
      });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.loadArticles();
  }
  ngOnDestroy(): void {}
}
