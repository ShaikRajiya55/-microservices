/*
 * PicoRV32 -- Parameterized RISC-V SART Core Reference
 * Upstream Reference Verilog Source for Parameterized RTL Contract Reconciliation
 */

module picorv32 #(
	parameter DATA_WIDTH = 32,
	parameter ADDR_WIDTH = 32,
	parameter STRB_WIDTH = 4,
	parameter TRACE_WIDTH = 36
) (
	input clk, resetn,
	output reg trap,

	output reg        mem_valid,
	output reg        mem_instr,
	input             mem_ready,

	output reg [ADDR_WIDTH-1:0] mem_addr,
	output reg [DATA_WIDTH-1:0] mem_wdata,
	output reg [STRB_WIDTH-1:0] mem_wstrb,
	input      [DATA_WIDTH-1:0] mem_rdata,

	// Look-Ahead Interface
	output            mem_la_read,
	output            mem_la_write,
	output     [ADDR_WIDTH-1:0] mem_la_addr,
	output     [DATA_WIDTH-1:0] mem_la_wdata,
	output     [STRB_WIDTH-1:0] mem_la_wstrb,

	// PicoCoProcessor Interface (PCPI)
	output            pcpi_valid,
	output     [DATA_WIDTH-1:0] pcpi_insn,
	output     [DATA_WIDTH-1:0] pcpi_rs1,
	output     [DATA_WIDTH-1:0] pcpi_rs2,
	input             pcpi_wr,
	input      [DATA_WIDTH-1:0] pcpi_rd,
	input             pcpi_wait,
	input             pcpi_ready,

	// IRQ Interface
	input      [DATA_WIDTH-1:0] irq,
	output     [DATA_WIDTH-1:0] eoi,

	// Trace Interface
	output            trace_valid,
	output     [TRACE_WIDTH-1:0] trace_data
);
endmodule

module picorv32_axi #(
	parameter AXI_ADDR_WIDTH = 64,
	parameter AXI_DATA_WIDTH = 64,
	parameter AXI_STRB_WIDTH = 8,
	parameter PROT_WIDTH = 3,
	parameter RESP_WIDTH = 2
) (
	input clk, resetn,
	output trap,

	// AXI4 Master Interface
	output        mem_axi_awvalid,
	input         mem_axi_awready,
	output [AXI_ADDR_WIDTH-1:0] mem_axi_awaddr,
	output [PROT_WIDTH-1:0] mem_axi_awprot,

	output        mem_axi_wvalid,
	input         mem_axi_wready,
	output [AXI_DATA_WIDTH-1:0] mem_axi_wdata,
	output [AXI_STRB_WIDTH-1:0] mem_axi_wstrb,

	input         mem_axi_bvalid,
	output        mem_axi_bready,
	input  [RESP_WIDTH-1:0] mem_axi_bresp,

	output        mem_axi_arvalid,
	input         mem_axi_arready,
	output [AXI_ADDR_WIDTH-1:0] mem_axi_araddr,
	output [PROT_WIDTH-1:0] mem_axi_arprot,

	input         mem_axi_rvalid,
	output        mem_axi_rready,
	input  [AXI_DATA_WIDTH-1:0] mem_axi_rdata,
	input  [RESP_WIDTH-1:0] mem_axi_rresp,

	// IRQ Interface
	input  [31:0] irq,
	output [31:0] eoi,

	// Trace Interface
	output        trace_valid,
	output [35:0] trace_data
);
endmodule

module picorv32_pcpi_mul #(
	parameter OPERAND_WIDTH = 32,
	parameter STEPS_AT_ONCE = 1
) (
	input clk, resetn,
	input pcpi_valid,
	input [OPERAND_WIDTH-1:0] pcpi_insn,
	input [OPERAND_WIDTH-1:0] pcpi_rs1,
	input [OPERAND_WIDTH-1:0] pcpi_rs2,

	output reg        pcpi_wr,
	output reg [OPERAND_WIDTH-1:0] pcpi_rd,
	output reg        pcpi_wait,
	output reg        pcpi_ready
);
endmodule
