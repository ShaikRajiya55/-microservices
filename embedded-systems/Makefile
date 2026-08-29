CC ?= gcc
CFLAGS ?= -Wall -Wextra -std=c99 -Iinclude -O2
SRCS = $(shell find src -name '*.c')
TEST_SRCS = $(shell find tests -name '*.c')
OBJS = $(SRCS:.c=.o)
TEST_OBJS = $(TEST_SRCS:.c=.o)

all: nexos_app nexos_test_runner

nexos_app: $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

nexos_test_runner: $(OBJS) $(TEST_OBJS)
	$(CC) $(CFLAGS) -o $@ $^

test: nexos_test_runner
	./nexos_test_runner

clean:
	rm -f $(OBJS) $(TEST_OBJS) nexos_app nexos_test_runner

.PHONY: all test clean
