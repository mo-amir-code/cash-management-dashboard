const WithdrawalHistory = ({ data }: { data: any }) => {
  return (
    <div className="space-y-4">
      <div className="max-h-[50vh] hide_scrollbar overflow-y-auto">
        <table className="w-full bg-white">
          {data?.length ? (
            <>
              <thead className="py-4 text-text-color rounded-lg max-md:text-sm bg-primary-color">
                <tr>
                  <th>Location</th>
                  <th>Emp.ID</th>
                  <th>Emp.Name</th>
                  <th>Collection(MM)</th>
                  <th>Date</th>
                  <th>Difference</th>
                </tr>
              </thead>
              <tbody className="text-sm max-md:text-xs space-y-2">
                <tr className="border">
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                  <td className="text-center"></td>
                </tr>
              </tbody>
            </>
          ) : (
            <p className="text-center w-full max-md:text-sm">0 Transactions</p>
          )}
        </table>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
