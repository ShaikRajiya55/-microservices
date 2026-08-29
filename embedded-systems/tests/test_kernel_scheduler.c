#include "nexos/kernel/scheduler.h"
#include <stdio.h>
#include <assert.h>
int test_kernel(void) { nexos_kernel_scheduler_handle_t s; assert(nexos_kernel_scheduler_init(&s) == NEXOS_KERNEL_SCHEDULER_STATUS_OK); return 0; }
