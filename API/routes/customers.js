import { Router } from "express";
const router = Router();

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    status: "Active",
  },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Active" },
  {
    id: 3,
    name: "Carol White",
    email: "carol@example.com",
    status: "Inactive",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    status: "Active",
  },
  { id: 5, name: "Eve Davis", email: "eve@example.com", status: "Active" },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank@example.com",
    status: "Pending",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    status: "Pending",
  },
  {
    id: 8,
    name: "Frank Miller",
    email: "frank@example.com",
    status: "Pending",
  },
  {
    id: 9,
    name: "Frank Miller",
    email: "frank@example.com",
    status: "Pending",
  },
  {
    id: 10,
    name: "Frank Miller",
    email: "frank@example.com",
    status: "Pending",
  },
];

router.get("/", (req, res) => {
  res.json(customers);
});

export default router;
