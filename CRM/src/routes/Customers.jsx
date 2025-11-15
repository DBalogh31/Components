import { useState } from "react";
import { GenericSelector } from "../components/CustomerSelector.jsx";
import { useCustomers } from "../hooks/useCustomers.js";

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
  });
  const { fetchCustomers } = useCustomers();

  return (
    <div>
      <h1 className="text-green-700 font-bold text-2xl">Customers</h1>
      <GenericSelector
        value={selectedCustomer ? selectedCustomer.id : ""}
        selectedItem={selectedCustomer}
        onChange={setSelectedCustomer}
        label="Choose a Customer"
        placeholder="Select a customer"
        fetchOptions={fetchCustomers}
        optionValueKey="id"
        optionLabelKey="name"
        optionExtraLabel={(item) => `(${item.email})`}
        withAsterisk={true}
      />
    </div>
  );
}
