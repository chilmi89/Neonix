declare module 'html5-qrcode' {
    export class Html5QrcodeScanner {
        constructor(elementId: string, config: any, verbose: boolean);
        render(onScanSuccess: (text: string, result: any) => void, onScanFailure: (err: any) => void): void;
        clear(): Promise<void>;
    }
    export class Html5Qrcode {
        constructor(elementId: string);
        start(cameraId: any, config: any, onScanSuccess: any, onScanFailure: any): Promise<void>;
        stop(): Promise<void>;
        static getCameras(): Promise<any[]>;
    }
}
