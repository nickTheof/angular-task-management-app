import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiCardResponsesService {
    private _isLoading = signal<boolean>(false);
    private _success = signal<string | null>(null);
    private _error = signal<string | null>(null);

    readonly isLoading = this._isLoading.asReadonly();
    readonly success = this._success.asReadonly();
    readonly error = this._error.asReadonly();

    activateLoading() {
      this._isLoading.set(true);
    }

    deactivateLoading() {
      this._isLoading.set(false);
    }

    clearError() {
      this._error.set(null);
    }

    clearSuccess() {
      this._success.set(null);
    }

    setError(error: string): void {
      this._error.set(error);
      this._success.set(null);
    }

    setSuccess(success: string): void {
      this._success.set(success);
      this._error.set(null)
    }

}
