declare module 'razorpay' {
    interface RazorpayConfig {
        key_id: string;
        key_secret: string;
    }

    interface OrderCreateOptions {
        amount: number;
        currency: string;
        receipt?: string;
        notes?: Record<string, string>;
        partial_payment?: boolean;
    }

    interface Order {
        id: string;
        entity: string;
        amount: number;
        amount_paid: number;
        amount_due: number;
        currency: string;
        receipt: string;
        status: string;
        attempts: number;
        notes: Record<string, string>;
        created_at: number;
    }

    interface Orders {
        create(options: OrderCreateOptions): Promise<Order>;
        fetch(orderId: string): Promise<Order>;
        fetchAll(options?: Record<string, unknown>): Promise<{ items: Order[] }>;
    }

    class Razorpay {
        constructor(config: RazorpayConfig);
        orders: Orders;
    }

    export = Razorpay;
}
