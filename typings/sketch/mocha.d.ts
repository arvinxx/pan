declare class Mocha {
    static sharedRuntime(): Mocha;
    globalSymbolNames(): NSArray;
    loadFrameworkWithName_inDirectory(name:string, dir:string): void;
    // there's more https://github.com/logancollins/Mocha/blob/master/Mocha/MochaRuntime.h
}

declare class MOClassDescription {
    name(): NSString;
    superclass(): NSArray;
    ancestors(): NSArray;
    instanceVariables(): NSArray;
    classMethods(): NSArray;
    instanceMethods(): NSArray;
    properties(): NSArray;
    protocols(): NSArray;
    instanceVariablesWithAncestors(): NSArray;
    classMethodsWithAncestors(): NSArray;
    instanceMethodsWithAncestors(): NSArray;
    propertiesWithAncestors(): NSArray;
    protocolsWithAncestors(): NSArray;
}

declare class MOPropertyDescription {
    name(): NSString;
    typeEncoding(): NSString;
    ivarName(): NSString;
    ownershipRule(): any;
    dynamic(): boolean;
    nonAtomic(): boolean;
    readOnly(): boolean;
    weak(): boolean;
}

interface MOMethodDescription {
    selector(): NSString;
    typeEncoding(): NSString;
}
