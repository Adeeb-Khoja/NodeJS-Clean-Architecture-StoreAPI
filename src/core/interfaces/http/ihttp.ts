export interface IHttpRequest {
    params: Record<string, string>;
    query: Record<string, string>;
    body: any;
}

export interface IHttpResponse {
    status(code: number):  this;
    json(data: any): this;
    send(body: any): this;
}
