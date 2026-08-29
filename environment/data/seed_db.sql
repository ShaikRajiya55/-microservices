-- DDL and seed data for RTL Physical Design SQL Database

CREATE TABLE IF NOT EXISTS rtl_ports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_name TEXT NOT NULL,
    port_name TEXT NOT NULL,
    direction TEXT NOT NULL CHECK(direction IN ('input', 'output', 'inout')),
    msb INTEGER NOT NULL,
    lsb INTEGER NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(module_name, port_name)
);

-- Seed SQL Overrides for picorv32
-- 1. Override mem_addr width from 32-bit [31:0] (Verilog) to 64-bit [63:0] (SQL)
INSERT OR REPLACE INTO rtl_ports (module_name, port_name, direction, msb, lsb, is_active)
VALUES ('picorv32', 'mem_addr', 'output', 63, 0, 1);

-- 2. Add custom CAD design port not present in base Verilog
INSERT OR REPLACE INTO rtl_ports (module_name, port_name, direction, msb, lsb, is_active)
VALUES ('picorv32', 'db_status_flag', 'output', 7, 0, 1);

-- 3. Deactivate trace_data port in physical design DB
INSERT OR REPLACE INTO rtl_ports (module_name, port_name, direction, msb, lsb, is_active)
VALUES ('picorv32', 'trace_data', 'output', 35, 0, 0);

-- Seed SQL Overrides for picorv32_axi
-- Override mem_axi_awaddr to 64-bit [63:0]
INSERT OR REPLACE INTO rtl_ports (module_name, port_name, direction, msb, lsb, is_active)
VALUES ('picorv32_axi', 'mem_axi_awaddr', 'output', 63, 0, 1);
