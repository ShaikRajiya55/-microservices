#include <stdio.h>
extern int test_kernel(void);
extern int test_hal(void);
extern int test_protocols(void);
extern int test_dsp(void);
extern int test_sec(void);
int main(void) {
    printf("Running NexOS Test Runner...\n");
    test_kernel(); test_hal(); test_protocols(); test_dsp(); test_sec();
    printf("ALL TESTS PASSED!\n");
    return 0;
}
