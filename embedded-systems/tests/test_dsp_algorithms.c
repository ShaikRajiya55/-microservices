#include "nexos/dsp/fft_analyzer.h"
#include <stdio.h>
#include <assert.h>
int test_dsp(void) { nexos_dsp_fft_analyzer_handle_t f; assert(nexos_dsp_fft_analyzer_init(&f) == NEXOS_DSP_FFT_ANALYZER_STATUS_OK); return 0; }
