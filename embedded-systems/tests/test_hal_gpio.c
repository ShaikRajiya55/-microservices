#include "nexos/hal/gpio.h"
#include <stdio.h>
#include <assert.h>
int test_hal(void) { nexos_hal_gpio_handle_t g; assert(nexos_hal_gpio_init(&g) == NEXOS_HAL_GPIO_STATUS_OK); return 0; }
