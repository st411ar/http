import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, filter, map, switchAll, tap } from 'rxjs/operators';
import { Response } from '@angular/http';

import { SearchResult } from '../search-result/search-result.model';
import { YouTubeSearchService } from '../../services/you-tube-search.service';


@Component({
	selector: 'app-search-box',
	templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
	@Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

	constructor(
			private youtube: YouTubeSearchService,
			private el: ElementRef
	) {}

	ngOnInit() {
		fromEvent(this.el.nativeElement, 'keyup')
			.pipe(
				map((event: any) => event.target.value),
				filter((text: string) => text.length > 1),
				debounceTime(250),
				tap(() => this.loading.emit(true)),
				map((query: string) => this.youtube.search(query)),
				switchAll()
			).subscribe(
				(results: SearchResult[]) => {
					this.loading.emit(false);
					this.results.emit(results);
				},
				(err: any) => {
					console.log(err);
					this.loading.emit(false);
				},
				() => {
					this.loading.emit(false);
				}
			);
		;
				
	}

}
