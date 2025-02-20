"use client";
import { useParams } from "next/navigation";
import Complete from "./complete";

interface CompletePageProps {
    totalPaidPrice: number;
    addedPoints: number;
    orderId: string;
}

const CompletePage = () => {
    const params = useParams();
    const orderId = params.orderId as string;

    const completeData: CompletePageProps = {
        totalPaidPrice: 0,
        addedPoints: 0,
        orderId: orderId,
    };

    return (
        <div>
            <Complete
                amount={completeData.totalPaidPrice}
                points={completeData.addedPoints}
            />
        </div>
    );
};

export default CompletePage;
