#!/bin/bash
killall -SIGUSR1 can_logger
# Use a SIGUSR1 signal to tell 
# to the can_logger service to start a new file