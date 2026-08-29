#include "nexos/security/aes256_cipher.h"
#include <stdio.h>
#include <assert.h>
int test_sec(void) { nexos_security_aes256_cipher_handle_t a; assert(nexos_security_aes256_cipher_init(&a) == NEXOS_SECURITY_AES256_CIPHER_STATUS_OK); return 0; }
