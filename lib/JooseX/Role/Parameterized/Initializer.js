Class('JooseX.Role.Parameterized.Initializer', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Joose.Meta.Role,
    
    
    has : {
        initializer        : null
    },
    
        
    builder : {
        
        methods : {
            
            initializer : function (meta, initializer) {
                meta.initializer = initializer
            }
        }
    
    },
    
    
    stem : {
        
        // this will cause the role to remain open after creation (we need to wait till the application moment)
        has : {
            firstConsumption    : true
        },
        
        
        methods : {
            
            beforeConsumedBy : function (targetStem) {
                if (this.firstConsumption) {
                    var targetMeta          = this.targetMeta
                    var initializer         = targetMeta.initializer
                    var consumingClass      = targetStem.targetMeta.c
                    
                    var res                 = initializer.meta.roleFunc.call(initializer, initializer, consumingClass)
                    
                    if (Joose.O.isFunction(res)) res = { does : res }
                    
                    targetMeta.extend(res)
                    
                    this.firstConsumption = false
                }
            }            
        }
    }  
})