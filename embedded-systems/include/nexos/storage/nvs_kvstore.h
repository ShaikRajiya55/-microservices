/**
 * @file nvs_kvstore.h
 * @brief Non-Volatile Key-Value Store Header Interface
 * @details NexOS Industrial Embedded Systems Platform
 * Copyright (c) 2026 NexOS Platform. All rights reserved.
 */

#ifndef NEXOS_STORAGE_NVS_KVSTORE_H
#define NEXOS_STORAGE_NVS_KVSTORE_H

#include <stdint.h>
#include <stdbool.h>
#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

#define NEXOS_STORAGE_NVS_KVSTORE_H_VERSION "2.5.0"
#define NEXOS_STORAGE_NVS_KVSTORE_H_MAGIC   0x584F5300

typedef enum {
    NEXOS_STORAGE_NVS_KVSTORE_STATUS_OK = 0,
    NEXOS_STORAGE_NVS_KVSTORE_STATUS_ERROR = -1,
    NEXOS_STORAGE_NVS_KVSTORE_STATUS_BUSY = -2,
    NEXOS_STORAGE_NVS_KVSTORE_STATUS_TIMEOUT = -3,
    NEXOS_STORAGE_NVS_KVSTORE_STATUS_PARAM_ERR = -4,
    NEXOS_STORAGE_NVS_KVSTORE_STATUS_NO_MEM = -5
} nexos_storage_nvs_kvstore_status_t;

typedef struct {
    uint32_t magic_id;
    uint32_t state_flags;
    uint32_t error_counter;
    uint32_t tick_counter;
    void *priv_data;
    uint8_t buffer[256];
} nexos_storage_nvs_kvstore_handle_t;

nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_init(nexos_storage_nvs_kvstore_handle_t *handle);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_deinit(nexos_storage_nvs_kvstore_handle_t *handle);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_reset(nexos_storage_nvs_kvstore_handle_t *handle);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_1(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_2(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_3(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_4(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_5(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_6(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_7(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_8(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_9(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_10(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_11(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_12(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_13(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_14(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_15(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_16(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_17(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_18(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_19(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);
nexos_storage_nvs_kvstore_status_t nexos_storage_nvs_kvstore_process_step_20(nexos_storage_nvs_kvstore_handle_t *handle, uint32_t in_val, uint32_t *out_val);

#ifdef __cplusplus
}
#endif

#endif /* NEXOS_STORAGE_NVS_KVSTORE_H */
