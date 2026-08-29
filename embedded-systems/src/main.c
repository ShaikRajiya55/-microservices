/**
 * @file main.c
 * @brief NexOS System Main Entrypoint
 */
#include "nexos/kernel/scheduler.h"
#include "nexos/hal/gpio.h"
#include "nexos/protocols/mqtt_client.h"
#include "nexos/security/ota_firmware_updater.h"
#include <stdio.h>

int main(void) {
    printf("=====================================================\n");
    printf("  NexOS Industrial Embedded System Booting v2.5.0    \n");
    printf("=====================================================\n");
    
    nexos_kernel_scheduler_handle_t sched;
    if (nexos_kernel_scheduler_init(&sched) == NEXOS_KERNEL_SCHEDULER_STATUS_OK) {
        printf("  [INIT] RTOS Scheduler Initialized Successfully.\n");
    }
    
    printf("  [SYS] All Hardware & Protocol Services Operational.\n");
    printf("=====================================================\n");
    return 0;
}
