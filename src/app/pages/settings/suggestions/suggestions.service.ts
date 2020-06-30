import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { API_URLS } from '../../../constants';
import { AppService } from '../../../core/app/app.service';
import {
    SuggestionDTO,
    SuggestionUpdateRequest,
} from './suggestions.interfaces';
import {
    SUGGESTION_CREATE,
    SUGGESTION_FETCHING,
    SUGGESTION_REMOVE_FETCHING,
    SUGGESTION_UPDATE,
    SUGGESTIONS_FETCHING,
} from './suggestions.constants';
import {
    Suggestion,
    SuggestionListItem,
} from '../../../models/suggestions.model';
import { applyTemplate } from '../../../utils';
import { ACTION_TITLE, ActionType } from '../../../components/table';

@Injectable()
export class SuggestionsService {
    constructor(private http: HttpClient, private _app: AppService) {}

    getData(): Observable<SuggestionListItem[]> {
        this._app.startLoading(SUGGESTIONS_FETCHING);
        return this.http.get(API_URLS.SUGGESTIONS).pipe(
            map((suggestions: SuggestionDTO[]) => {
                return suggestions.map(suggestion => ({
                    ...suggestion,
                    actions: [
                        {
                            title: ACTION_TITLE[ActionType.EDIT],
                            type: ActionType.EDIT,
                        },
                        {
                            title: ACTION_TITLE[ActionType.REMOVE],
                            type: ActionType.REMOVE,
                        },
                    ],
                }));
            }),
            finalize(() => this._app.finishLoading(SUGGESTIONS_FETCHING))
        );
    }

    getSuggestion(id: string | number): Observable<Suggestion> {
        this._app.startLoading(SUGGESTION_FETCHING);
        return this.http.get(applyTemplate(API_URLS.SUGGESTION, { id })).pipe(
            map((x: SuggestionDTO) => x),
            finalize(() => this._app.finishLoading(SUGGESTION_FETCHING))
        );
    }

    remove(id: string): Observable<Object> {
        this._app.startLoading(SUGGESTION_REMOVE_FETCHING);
        return this.http
            .delete(applyTemplate(API_URLS.SUGGESTION, { id }))
            .pipe(
                finalize(() =>
                    this._app.finishLoading(SUGGESTION_REMOVE_FETCHING)
                )
            );
    }

    update(
        id: string | number,
        request: SuggestionUpdateRequest
    ): Observable<Suggestion> {
        this._app.startLoading(SUGGESTION_UPDATE);
        return this.http
            .put(applyTemplate(API_URLS.SUGGESTION, { id }), request)
            .pipe(
                map((x: SuggestionDTO) => x),
                finalize(() => this._app.finishLoading(SUGGESTION_UPDATE))
            );
    }

    create(request: SuggestionUpdateRequest): Observable<Suggestion> {
        this._app.startLoading(SUGGESTION_CREATE);
        return this.http.post(API_URLS.SUGGESTIONS, request).pipe(
            map((x: SuggestionDTO) => x),
            finalize(() => this._app.finishLoading(SUGGESTION_CREATE))
        );
    }
}
