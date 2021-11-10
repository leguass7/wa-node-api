export interface MaxbotOptions {
    token: string;
    /** default 5000 ms  */
    timeout?: number;
    /** default `https://mbr.maxbot.com.br/api/v1.php` */
    baseURL?: string;
    debug?: boolean;
}
export interface IMaxbotResponse {
    status: 0 | 1;
    msg: 'Success' | 'Failure';
}
