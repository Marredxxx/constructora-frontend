import { apiBackend } from "./ApiClient";

interface HttpClientListener {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

class Client {

    private uri: string = '';
    private body: any = null;
    private id: string | number = '';
    private headers: any = {
        skipAuth: false
    };

    private constructor() {}
    static builder(): Client {
        return new Client();
    }
    private buildUrl(): string {
        const url = this.uri;
        if (this.id) {
            if (!url.endsWith('/')) {
                return `${url}/${this.id}`;
            }
            return `${url}${this.id}`;
        }
        return url;
    }

    path(url: string): Client {
        this.uri = url;
        return this;
    }

    variable(id: string | number): Client {
        this.id = id;
        return this;
    }

    data(body: any): Client {
        this.body = body;
        return this;
    }

    skipAuth(): Client {
        this.headers.skipAuth = true;
        return this;
    }

    post(listener: HttpClientListener): void {
        apiBackend.post(this.buildUrl(), this.body, { headers: this.headers })
        .then(response => {
            listener.onSuccess?.(response.data);
        })
        .catch(error => {
            listener.onError?.(error);
        });
    }

    get(listener: HttpClientListener): void {
        apiBackend.get(this.buildUrl(), { headers: this.headers })
        .then(response => {
            listener.onSuccess?.(response.data);
        })
        .catch(error => {
            listener.onError?.(error);
        });
    }

    put(listener: HttpClientListener): void {
        apiBackend.put(this.buildUrl(), this.body, { headers: this.headers })
        .then(response => {
            listener.onSuccess?.(response.data);
        })
        .catch(error => {
            listener.onError?.(error);
        });
    }

    delete(listener: HttpClientListener): void {
        apiBackend.delete(this.buildUrl(), { headers: this.headers })
        .then(response => {
            listener.onSuccess?.(response.data);
        })
        .catch(error => {
            listener.onError?.(error);
        });
    }
}

export default Client;
