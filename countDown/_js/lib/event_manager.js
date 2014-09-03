/**
* @title Event Manager
* @description To be described.
*
*
* @author GoMo
* @version 2.0 17/12/12
*/

/*
NOTE: Events are progated in sequence of registry, the first object to be register will be the first tested. This generally
			means the frameset level objects take precedence.
*/
var EM =
{
	strObjID : "The event manager",

	_intUniqueId: 0,
	_objRegisteredObjects: {},
	_objRegisteredFunctions: {},
	_arrLoggedEvents : [],
	//_booLogEvents : BOO_LOG_EVENTS,

	_getNextUniqueId : function ()
	{
		this._intUniqueId++;
		return this._intUniqueId;
	},

	_getObjectId: function (_objWhatObject)
	{
		_intReturn = -1;
		var count = 0;
		for (var _intId in this._objRegisteredObjects)
		{
			var _objCurrRegisteredObject = this._objRegisteredObjects[_intId]
			if (_objCurrRegisteredObject === _objWhatObject)
			{
				_intReturn = _intId;
				break;
			}
		}
		return _intReturn;
	},

	register: function (_objWhatObject)
	{
		if(this._getObjectId(_objWhatObject) == -1)
		{
			var _intId = this._getNextUniqueId();
			this._objRegisteredObjects[_intId] = _objWhatObject;
			this._getHandledEvents(_objWhatObject, _intId);
			this._debug("EM.register(_objWhatObject:)");
		}
	},

	_getHandledEvents: function(_objWhatObject, _intId)
	{
		for(var _strProperty in _objWhatObject)
		{
			if(typeof(_objWhatObject[_strProperty]) == "function" && _strProperty.indexOf("handleEvent_") == 0)
			{
				var _strEventName = _strProperty.replace("handleEvent_","");
				if(!this._objRegisteredFunctions[_strEventName])
				{
					this._objRegisteredFunctions[_strEventName] = {};
				}
				this._objRegisteredFunctions[_strEventName][_intId] = true;
			}
		}
	},

	updateExtendedObject : function (_objBase, _objExtension)
	{
		var _intObjId = this._getObjectId(_objBase);
		if(_intObjId > -1)
		{
			this._getHandledEvents(_objExtension, _intObjId);
		}
	},

	unregister: function (_objWhatObject)
	{
		var _intObjId = this._getObjectId(_objWhatObject);
		if(_intObjId > -1)
		{
			this._removeRegisteredFunctions(_intObjId);
			delete this._objRegisteredObjects[_intObjId];
		}
	},

	_removeRegisteredFunctions : function(_intId)
	{
		for(var _strEventName in this._objRegisteredFunctions)
		{
			delete this._objRegisteredFunctions[_strEventName][_intId];
		}
	},

	trigger: function(_strEventName, _mixParam)
	{
		if ((window['CORE']) && (CORE.objConfig) && (CORE.objConfig['booLogEvents']))
		{
			this._arrLoggedEvents.push(_strEventName)
		}

		var _booTriggered = false;
		var _booBubbleUp = true;

		if(this._objRegisteredFunctions[_strEventName])
		{
			for(var _intObjectId in this._objRegisteredFunctions[_strEventName])
			{
				if(_intObjectId)
				{
					_objObject = this._objRegisteredObjects[_intObjectId];
					var _booResult = this.fireIfHandled(_objObject, _strEventName, _mixParam);
					if (_booResult)
					{
						_booTriggered = true;
					}
				}
			}
		}
		if ((!_booTriggered) && (window['CORE']) && (window['CORE'].objConfig) && (CORE.objConfig['booAlertUnhandledEvents']))
		{
			// TO LOCALISE
			alert("WARNING: Unhandled event with the name of '" + _strEventName + "' found in EM.trigger(), eventmanager.js");
			//LOCALISER.l_alert("EVENT_MANANAGER_UNHANDLED_EVENT_WARNING", [_strEventName]);
		}

		// Return false to prevent page reloads if the event was triggered from a link's onclick event.
		return false;
	},

	fireIfHandled: function(_obj, _strEventName, _mixParam)
	{
		if ((_obj) && (_obj['handleEvent_'+_strEventName]))
		{
			_obj['handleEvent_'+_strEventName](_mixParam);
			return true;
		}
		return false;
	},

	_debug : function (_strMessage)
	{
		if (window["console"] && window["BOO_DEBUG_MESSAGES"])
		{
			console.log(_strMessage);
		}
	},

	booTerminal : true
}