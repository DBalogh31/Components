import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { AppShell, Burger } from "@mantine/core";

export default function Layout() {
  const [opened, setOpened] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const menu = [
    { to: "/", label: "Dashboard", icon: faTachometerAlt },
    { to: "/customers", label: "Customers", icon: faUsers },
  ];

  return (
    <AppShell
      header={{ height: 40 }}
      navbar={{
        width: expanded ? 250 : 70,
        collapsed: !opened,
      }}
      opened={opened}
    >
      {/* Header */}
      <AppShell.Header
        style={{
          backgroundColor: "#10b981", // emerald-500
          display: "flex",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          border: "0",
        }}
      >
        <div className="flex items-center w-full">
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="xs"
            className="md:hidden"
            color="#fff"
          />
          <h1 style={{ fontSize: "1.25rem", fontWeight: 600, color: "#fff" }}>
            My CRM
          </h1>
        </div>
      </AppShell.Header>

      {/* Sidebar - always to the left of content */}
      <AppShell.Navbar
        style={{
          backgroundColor: "#10b981", // emerald-50
          transition: "all 0.3s",
          display: "flex",
          flexDirection: "column",
          border: "0",
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {menu.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 0.5rem",
                color: "#fff",
                transition: "background-color 0.2s",
                textDecoration: "none",
              }}
              className="hover:bg-emerald-600"
            >
              {/* FA Icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "0.875rem",
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#34d399", // emerald-400
                  color: "#fff",
                  flexShrink: 0,
                  fontSize: "1.5rem",
                }}
                className="shadow-sm mx-2"
                aria-hidden
              >
                <FontAwesomeIcon icon={item.icon} />
              </div>

              {/* Label - visible only when expanded */}
              <span
                style={{
                  marginLeft: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "opacity 0.2s",
                  opacity: expanded ? 1 : 0,
                  visibility: expanded ? "visible" : "hidden",
                }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </AppShell.Navbar>

      {/* Main Content - always offset */}
      <AppShell.Main
        style={{
          paddingTop: "5rem",
          paddingLeft: "10rem",
          paddingRight: "1.5rem",
          paddingBottom: "1.5rem",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
