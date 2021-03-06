Class('JooseX.Role.Parameterized', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Joose.Meta.Class,
    
    does    : 'JooseX.Class.SimpleConstructor',
    
    use     : 'JooseX.Role.Parameterized.Initializer',
    
    
    has : {
        roleFunc        : null,
        introspect      : false
    },
    
        
    builder : {
        
        methods : {
            
            parameter : function (meta, info) {
                this.has(meta, info)
            },
            
            
            role : function (meta, roleFunc) {
                meta.roleFunc = roleFunc
            },
            
            
            introspect : function (meta, value) {
                meta.introspect = value
            }
        }
    
    },
    
    
    after : {
        
        processStem : function () {
            
            var meta = this
            
            // adds a default `initialize` method to any parameterized role 
            this.addMethod('initialize', function () {
                
                var roleFunc = meta.roleFunc
                
                if (!roleFunc) throw "The producing `role` function is not defined for [" + meta.name + "]"
                
                if (meta.introspect) 
                    return Role({
                        meta        : JooseX.Role.Parameterized.Initializer,
                        
                        initializer : this
                    })
                else {
                    var res = roleFunc.call(this, this)
                    
                    if (!Joose.O.isFunction(res)) res = Role(res)
                    
                    return res
                }
            })
        }
    }
    
})