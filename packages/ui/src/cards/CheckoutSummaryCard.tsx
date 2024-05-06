interface CheckoutSummaryCardProps {
  amount: number;
}

export function CheckoutSummaryCard({ amount }: CheckoutSummaryCardProps) {
  return (
    <div className="bg-white shadow-md p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">Project Name</h3>
          <p className="text-sm text-gray-500">Project Description</p>
        </div>
        <div>
          <span className="text-lg font-bold">£{amount}</span>
        </div>
      </div>
    </div>
  );
}
