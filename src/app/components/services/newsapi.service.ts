import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Article } from 'src/app/modals/articule.modal';
import { NewsResponse } from '../../modals/articule.modal';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey: string = 'f16ccf196a87435a8f58d6f01b7780e4  ';
  private baseUrl: string = 'https://newsapi.org/v2/everything';

  constructor(private http: HttpClient) {}

  getNewsArticles(
    searchTerm: string,
    page: number,
    pageSize: number
  ): Observable<Article[]> {
    searchTerm = searchTerm.trim();
    if (!searchTerm) {
      searchTerm = 'world';
    }

    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('q', searchTerm)
      .set('pageSize', pageSize.toString())
      .set('page', page.toString());

    return this.http
      .get<NewsResponse>(this.baseUrl, { params })
      .pipe(map((response) => response.articles));
  }
}
