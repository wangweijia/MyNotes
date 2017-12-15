#import "ViewController.h"

@interface ViewController ()
@property (nonatomic, strong) NSMutableArray *array;

@end
@implementation ViewController

- (void)addBlock1:(NSMutableArray *)array {
    NSString *s = @"1";
    void(^blockt)(void) = ^{
        NSLog(@"%@", s);
    };

    NSLog(@"add block1");
    NSLog(@"%@", blockt);

    [array addObject:blockt];
}

- (void)addBlock2:(NSMutableArray *)array {

    void(^blockt)(void) = ^{
        NSLog(@"2");
    };

    NSLog(@"add block2");
    NSLog(@"%@", blockt);

    [array addObject:blockt];
}

- (void)addBlock3:(NSMutableArray *)array {

    void(^blockt)(void) = ^{
        NSLog(@"3");
    };

    NSLog(@"add block3");
    NSLog(@"%@", blockt);

    [array addObject:[blockt copy]];
}

- (void)viewDidLoad {
    [super viewDidLoad];

    self.array = [NSMutableArray array];

    [self addBlock1:self.array];
    void(^blockt1)(void) = self.array[0];
    NSLog(@"-=-=-=:%@", blockt1);
    blockt1();

    [self addBlock2:self.array];
    void(^blockt2)(void) = self.array[1];
    NSLog(@"-=-=-=:%@", blockt2);
    blockt2();

    [self addBlock3:self.array];
    void(^blockt3)(void) = self.array[2];
    NSLog(@"-=-=-=:%@", blockt3);
    blockt3();
}

@end
