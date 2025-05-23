import React, { useState } from "react";
import { X, Plus, Trash2, Users } from "lucide-react";
import type {
  EmployeeFormDataType,
  EmployeeType,
  FormRowType,
} from "../../../../types/components/layouts/admin/dashboard";

const EmployeeModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeFormDataType[]>([]);

  // Sample employee data
  const employees: EmployeeType[] = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Mike Johnson" },
    { id: 4, name: "Sarah Wilson" },
    { id: 5, name: "David Brown" },
    { id: 6, name: "Lisa Davis" },
  ];

  const handleEmployeeSelection = (employeeId: number) => {
    if (selectedEmployees.includes(employeeId)) {
      // Remove employee
      setSelectedEmployees((prev) => prev.filter((id) => id !== employeeId));
      setEmployeeData((prev) =>
        prev.filter((data) => data.employeeId !== employeeId)
      );
    } else {
      // Add employee with initial form row
      setSelectedEmployees((prev) => [...prev, employeeId]);
      setEmployeeData((prev) => [
        ...prev,
        {
          employeeId,
          rows: [
            {
              id: `${employeeId}-${Date.now()}`,
              amount: "",
              date: "",
              type: "",
            },
          ],
        },
      ]);
    }
  };

  const addNewRow = (employeeId: number) => {
    setEmployeeData((prev) =>
      prev.map((data) => {
        if (data.employeeId === employeeId) {
          return {
            ...data,
            rows: [
              ...data.rows,
              {
                id: `${employeeId}-${Date.now()}`,
                amount: "",
                date: "",
                type: "",
              },
            ],
          };
        }
        return data;
      })
    );
  };

  const removeRow = (employeeId: number, rowId: string) => {
    setEmployeeData((prev) =>
      prev.map((data) => {
        if (data.employeeId === employeeId) {
          return {
            ...data,
            rows: data.rows.filter((row) => row.id !== rowId),
          };
        }
        return data;
      })
    );
  };

  const updateRowData = (
    employeeId: number,
    rowId: string,
    field: keyof FormRowType,
    value: string
  ) => {
    setEmployeeData((prev) =>
      prev.map((data) => {
        if (data.employeeId === employeeId) {
          return {
            ...data,
            rows: data.rows.map((row) => {
              if (row.id === rowId) {
                return { ...row, [field]: value };
              }
              return row;
            }),
          };
        }
        return data;
      })
    );
  };

  const getUsedTypes = (employeeId: number): ("deposit" | "collection")[] => {
    const empData = employeeData.find((data) => data.employeeId === employeeId);
    if (!empData) return [];

    return empData.rows
      .map((row) => row.type)
      .filter(
        (type): type is "deposit" | "collection" =>
          type === "deposit" || type === "collection"
      );
  };

  const getAvailableTypes = (
    employeeId: number,
    currentRowId: string
  ): ("deposit" | "collection")[] => {
    const usedTypes = getUsedTypes(employeeId);
    const empData = employeeData.find((data) => data.employeeId === employeeId);
    const currentRow = empData?.rows.find((row) => row.id === currentRowId);

    // Include current row's type if it exists
    const availableTypes = ["deposit", "collection"].filter(
      (type) =>
        !usedTypes.includes(type as "deposit" | "collection") ||
        currentRow?.type === type
    );

    return availableTypes as ("deposit" | "collection")[];
  };

  const canAddNewRow = (employeeId: number): boolean => {
    const usedTypes = getUsedTypes(employeeId);
    return usedTypes.length < 2; // Can only have deposit and collection
  };

  const handleSubmit = () => {
    // Validation
    const isValid = employeeData.every((empData) =>
      empData.rows.every(
        (row) =>
          row.amount.trim() !== "" && row.date.trim() !== "" && row.type !== ""
      )
    );

    if (!isValid) {
      alert("Please fill all fields for all employees");
      return;
    }

    console.log("Form Data:", employeeData);
    alert("Data submitted successfully! Check console for details.");

    // Reset and close modal
    setIsModalOpen(false);
    setSelectedEmployees([]);
    setEmployeeData([]);
  };

  const resetModal = () => {
    setSelectedEmployees([]);
    setEmployeeData([]);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
      >
        <Users size={20} />
        Insert Employee Data
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 text-foreground-black bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                Select Employees & Add Details
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={resetModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              {/* Employee Selection */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Select Employees:
                </h3>
                <div className="max-w-md">
                  <select
                    onChange={(e) => {
                      const employeeId = parseInt(e.target.value);
                      if (
                        employeeId &&
                        !selectedEmployees.includes(employeeId)
                      ) {
                        handleEmployeeSelection(employeeId);
                      }
                      e.target.value = ""; // Reset dropdown
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="">Choose an employee to add...</option>
                    {employees
                      .filter(
                        (employee) => !selectedEmployees.includes(employee.id)
                      )
                      .map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Selected Employees Display */}
                {selectedEmployees.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      Selected Employees:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployees.map((employeeId) => {
                        const employee = employees.find(
                          (emp) => emp.id === employeeId
                        );
                        return (
                          <div
                            key={employeeId}
                            className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            <span>{employee?.name}</span>
                            <button
                              onClick={() =>
                                handleEmployeeSelection(employeeId)
                              }
                              className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                              title="Remove employee"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Employee Forms */}
              {selectedEmployees.length > 0 && (
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Employee Details:
                  </h3>
                  <div className="space-y-6">
                    {selectedEmployees.map((employeeId) => {
                      const employee = employees.find(
                        (emp) => emp.id === employeeId
                      );
                      const empData = employeeData.find(
                        (data) => data.employeeId === employeeId
                      );

                      return (
                        <div
                          key={employeeId}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="text-lg font-medium text-gray-800">
                              {employee?.name}
                            </h4>
                            {canAddNewRow(employeeId) && (
                              <button
                                onClick={() => addNewRow(employeeId)}
                                className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors text-sm"
                              >
                                <Plus size={16} />
                                Add Row
                              </button>
                            )}
                          </div>

                          <div className="space-y-3">
                            {empData?.rows.map((row) => (
                              <div
                                key={row.id}
                                className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-white rounded-lg border border-gray-200"
                              >
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Amount
                                  </label>
                                  <input
                                    type="number"
                                    value={row.amount}
                                    onChange={(e) =>
                                      updateRowData(
                                        employeeId,
                                        row.id,
                                        "amount",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter amount"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    value={row.date}
                                    onChange={(e) =>
                                      updateRowData(
                                        employeeId,
                                        row.id,
                                        "date",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type
                                  </label>
                                  <select
                                    value={row.type}
                                    onChange={(e) =>
                                      updateRowData(
                                        employeeId,
                                        row.id,
                                        "type",
                                        e.target.value
                                      )
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    <option value="">Select type</option>
                                    {getAvailableTypes(employeeId, row.id).map(
                                      (type) => (
                                        <option key={type} value={type}>
                                          {type.charAt(0).toUpperCase() +
                                            type.slice(1)}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>

                                <div className="flex items-end">
                                  {empData.rows.length > 1 && (
                                    <button
                                      onClick={() =>
                                        removeRow(employeeId, row.id)
                                      }
                                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                                      title="Remove row"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {selectedEmployees.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeModal;
