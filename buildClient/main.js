/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "db3f7acbcab7ed92d4c5";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"main": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// extract-css-chunks-webpack-plugin CSS loading
/******/ 		var cssChunks = {"1":1,"2":1,"5":1,"6":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "" + ({}[chunkId]||chunkId) + ".css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.request = request;
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/polyfill/lib/index.js":
/*!************************************************************************************************************!*\
  !*** delegated ./node_modules/@babel/polyfill/lib/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(227);\n\n//# sourceURL=webpack:///delegated_./node_modules/@babel/polyfill/lib/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/ansi-html/index.js":
/*!*****************************************!*\
  !*** ./node_modules/ansi-html/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = ansiHTML\n\n// Reference to https://github.com/sindresorhus/ansi-regex\nvar _regANSI = /(?:(?:\\u001b\\[)|\\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\\u001b[A-M]/\n\nvar _defColors = {\n  reset: ['fff', '000'], // [FOREGROUD_COLOR, BACKGROUND_COLOR]\n  black: '000',\n  red: 'ff0000',\n  green: '209805',\n  yellow: 'e8bf03',\n  blue: '0000ff',\n  magenta: 'ff00ff',\n  cyan: '00ffee',\n  lightgrey: 'f0f0f0',\n  darkgrey: '888'\n}\nvar _styles = {\n  30: 'black',\n  31: 'red',\n  32: 'green',\n  33: 'yellow',\n  34: 'blue',\n  35: 'magenta',\n  36: 'cyan',\n  37: 'lightgrey'\n}\nvar _openTags = {\n  '1': 'font-weight:bold', // bold\n  '2': 'opacity:0.5', // dim\n  '3': '<i>', // italic\n  '4': '<u>', // underscore\n  '8': 'display:none', // hidden\n  '9': '<del>' // delete\n}\nvar _closeTags = {\n  '23': '</i>', // reset italic\n  '24': '</u>', // reset underscore\n  '29': '</del>' // reset delete\n}\n\n;[0, 21, 22, 27, 28, 39, 49].forEach(function (n) {\n  _closeTags[n] = '</span>'\n})\n\n/**\n * Converts text with ANSI color codes to HTML markup.\n * @param {String} text\n * @returns {*}\n */\nfunction ansiHTML (text) {\n  // Returns the text if the string has no ANSI escape code.\n  if (!_regANSI.test(text)) {\n    return text\n  }\n\n  // Cache opened sequence.\n  var ansiCodes = []\n  // Replace with markup.\n  var ret = text.replace(/\\033\\[(\\d+)*m/g, function (match, seq) {\n    var ot = _openTags[seq]\n    if (ot) {\n      // If current sequence has been opened, close it.\n      if (!!~ansiCodes.indexOf(seq)) { // eslint-disable-line no-extra-boolean-cast\n        ansiCodes.pop()\n        return '</span>'\n      }\n      // Open tag.\n      ansiCodes.push(seq)\n      return ot[0] === '<' ? ot : '<span style=\"' + ot + ';\">'\n    }\n\n    var ct = _closeTags[seq]\n    if (ct) {\n      // Pop sequence\n      ansiCodes.pop()\n      return ct\n    }\n    return ''\n  })\n\n  // Make sure tags are closed.\n  var l = ansiCodes.length\n  ;(l > 0) && (ret += Array(l + 1).join('</span>'))\n\n  return ret\n}\n\n/**\n * Customize colors.\n * @param {Object} colors reference to _defColors\n */\nansiHTML.setColors = function (colors) {\n  if (typeof colors !== 'object') {\n    throw new Error('`colors` parameter must be an Object.')\n  }\n\n  var _finalColors = {}\n  for (var key in _defColors) {\n    var hex = colors.hasOwnProperty(key) ? colors[key] : null\n    if (!hex) {\n      _finalColors[key] = _defColors[key]\n      continue\n    }\n    if ('reset' === key) {\n      if (typeof hex === 'string') {\n        hex = [hex]\n      }\n      if (!Array.isArray(hex) || hex.length === 0 || hex.some(function (h) {\n        return typeof h !== 'string'\n      })) {\n        throw new Error('The value of `' + key + '` property must be an Array and each item could only be a hex string, e.g.: FF0000')\n      }\n      var defHexColor = _defColors[key]\n      if (!hex[0]) {\n        hex[0] = defHexColor[0]\n      }\n      if (hex.length === 1 || !hex[1]) {\n        hex = [hex[0]]\n        hex.push(defHexColor[1])\n      }\n\n      hex = hex.slice(0, 2)\n    } else if (typeof hex !== 'string') {\n      throw new Error('The value of `' + key + '` property must be a hex string, e.g.: FF0000')\n    }\n    _finalColors[key] = hex\n  }\n  _setTags(_finalColors)\n}\n\n/**\n * Reset colors.\n */\nansiHTML.reset = function () {\n  _setTags(_defColors)\n}\n\n/**\n * Expose tags, including open and close.\n * @type {Object}\n */\nansiHTML.tags = {}\n\nif (Object.defineProperty) {\n  Object.defineProperty(ansiHTML.tags, 'open', {\n    get: function () { return _openTags }\n  })\n  Object.defineProperty(ansiHTML.tags, 'close', {\n    get: function () { return _closeTags }\n  })\n} else {\n  ansiHTML.tags.open = _openTags\n  ansiHTML.tags.close = _closeTags\n}\n\nfunction _setTags (colors) {\n  // reset all\n  _openTags['0'] = 'font-weight:normal;opacity:1;color:#' + colors.reset[0] + ';background:#' + colors.reset[1]\n  // inverse\n  _openTags['7'] = 'color:#' + colors.reset[1] + ';background:#' + colors.reset[0]\n  // dark grey\n  _openTags['90'] = 'color:#' + colors.darkgrey\n\n  for (var code in _styles) {\n    var color = _styles[code]\n    var oriColor = colors[color] || '000'\n    _openTags[code] = 'color:#' + oriColor\n    code = parseInt(code)\n    _openTags[(code + 10).toString()] = 'background:#' + oriColor\n  }\n}\n\nansiHTML.reset()\n\n\n//# sourceURL=webpack:///./node_modules/ansi-html/index.js?");

/***/ }),

/***/ "./node_modules/ansi-regex/index.js":
/*!******************************************!*\
  !*** ./node_modules/ansi-regex/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = function () {\n\treturn /[\\u001b\\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;\n};\n\n\n//# sourceURL=webpack:///./node_modules/ansi-regex/index.js?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.from.js":
/*!*****************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.array.from.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(313);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.array.from.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.array.iterator.js":
/*!*********************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.array.iterator.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(110);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.array.iterator.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.keys.js":
/*!******************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.object.keys.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(236);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.object.keys.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.promise.js":
/*!**************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.promise.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(339);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.promise.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.replace.js":
/*!*********************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.regexp.replace.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(336);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.regexp.replace.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.regexp.to-string.js":
/*!***********************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.regexp.to-string.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(334);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.regexp.to-string.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.string.includes.js":
/*!**********************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.string.includes.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(289);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.string.includes.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!*************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es6.symbol.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(229);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es6.symbol.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es7.array.includes.js":
/*!*********************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es7.array.includes.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(366);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es7.array.includes.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/es7.symbol.async-iterator.js":
/*!****************************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/es7.symbol.async-iterator.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(375);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/es7.symbol.async-iterator.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom.iterable.js":
/*!*******************************************************************************************************************!*\
  !*** delegated ./node_modules/core-js/modules/web.dom.iterable.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(424);\n\n//# sourceURL=webpack:///delegated_./node_modules/core-js/modules/web.dom.iterable.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst normalizeUrl = __webpack_require__(/*! normalize-url */ \"./node_modules/normalize-url/index.js\");\n\nconst srcByModuleId = Object.create(null);\nconst debounce = __webpack_require__(/*! lodash/debounce */ \"./node_modules/lodash/debounce.js\");\n\nconst noDocument = typeof document === 'undefined';\nconst forEach = Array.prototype.forEach;\n\nconst noop = function () {};\n\nconst getCurrentScriptUrl = function (moduleId) {\n  let src = srcByModuleId[moduleId];\n\n  if (!src) {\n    if (document.currentScript) {\n      src = document.currentScript.src;\n    } else {\n      const scripts = document.getElementsByTagName('script');\n      const lastScriptTag = scripts[scripts.length - 1];\n\n      if (lastScriptTag) {\n        src = lastScriptTag.src;\n      }\n    }\n    srcByModuleId[moduleId] = src;\n  }\n\n  return function (fileMap) {\n    const splitResult = /([^\\\\/]+)\\.js$/.exec(src);\n    const filename = splitResult && splitResult[1];\n    if (!filename) {\n      return [src.replace('.js', '.css')];\n    }\n    return fileMap.split(',').map(function (mapRule) {\n      const reg = new RegExp(filename + '\\\\.js$', 'g');\n      return normalizeUrl(src.replace(reg, mapRule.replace(/{fileName}/g, filename) + '.css'), { stripWWW: false });\n    });\n  };\n};\n\nfunction updateCss(el, url) {\n  if (!url) {\n    url = el.href.split('?')[0];\n  }\n  if (el.isLoaded === false) {\n    // We seem to be about to replace a css link that hasn't loaded yet.\n    // We're probably changing the same file more than once.\n    return;\n  }\n  if (!url || !(url.indexOf('.css') > -1)) return;\n\n  el.visited = true;\n  const newEl = el.cloneNode();\n\n  newEl.isLoaded = false;\n  newEl.addEventListener('load', function () {\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n  newEl.addEventListener('error', function () {\n    newEl.isLoaded = true;\n    el.parentNode.removeChild(el);\n  });\n\n  newEl.href = url + '?' + Date.now();\n  el.parentNode.appendChild(newEl);\n}\n\nfunction getReloadUrl(href, src) {\n  href = normalizeUrl(href, { stripWWW: false });\n  let ret;\n  src.some(function (url) {\n    // eslint-disable-line array-callback-return\n    if (href.indexOf(src) > -1) {\n      ret = url;\n    }\n  });\n  return ret;\n}\n\nfunction reloadStyle(src) {\n  // eslint-disable-line no-unused-vars\n  const elements = document.querySelectorAll('link');\n  let loaded = false;\n\n  forEach.call(elements, function (el) {\n    if (el.visited === true) return;\n\n    const url = getReloadUrl(el.href, src);\n    if (url) {\n      updateCss(el, url);\n      loaded = true;\n    }\n  });\n\n  return loaded;\n}\n\nfunction reloadAll() {\n  const elements = document.querySelectorAll('link');\n  forEach.call(elements, function (el) {\n    if (el.visited === true) return;\n    updateCss(el);\n  });\n}\n\nmodule.exports = function (moduleId, options) {\n  if (noDocument) {\n    return noop;\n  }\n\n  const getScriptSrc = getCurrentScriptUrl(moduleId);\n\n  function update() {\n    const src = getScriptSrc(options.fileMap);\n    const reloaded = false; // hack of all hacks...for now\n    if (reloaded) {\n      console.log('[HMR] css reload %s', src.join(' ')); // eslint-disable-line no-console\n    } else {\n      console.log('[HMR] Reload all css'); // eslint-disable-line no-console\n      reloadAll();\n    }\n  }\n\n  return debounce(update, 10);\n};\n\n//# sourceURL=webpack:///./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js?");

/***/ }),

/***/ "./node_modules/fast-levenshtein/levenshtein.js":
/*!******************************************************!*\
  !*** ./node_modules/fast-levenshtein/levenshtein.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;(function() {\n  'use strict';\n  \n  var collator;\n  try {\n    collator = (typeof Intl !== \"undefined\" && typeof Intl.Collator !== \"undefined\") ? Intl.Collator(\"generic\", { sensitivity: \"base\" }) : null;\n  } catch (err){\n    console.log(\"Collator could not be initialized and wouldn't be used\");\n  }\n  // arrays to re-use\n  var prevRow = [],\n    str2Char = [];\n  \n  /**\n   * Based on the algorithm at http://en.wikipedia.org/wiki/Levenshtein_distance.\n   */\n  var Levenshtein = {\n    /**\n     * Calculate levenshtein distance of the two strings.\n     *\n     * @param str1 String the first string.\n     * @param str2 String the second string.\n     * @param [options] Additional options.\n     * @param [options.useCollator] Use `Intl.Collator` for locale-sensitive string comparison.\n     * @return Integer the levenshtein distance (0 and above).\n     */\n    get: function(str1, str2, options) {\n      var useCollator = (options && collator && options.useCollator);\n      \n      var str1Len = str1.length,\n        str2Len = str2.length;\n      \n      // base cases\n      if (str1Len === 0) return str2Len;\n      if (str2Len === 0) return str1Len;\n\n      // two rows\n      var curCol, nextCol, i, j, tmp;\n\n      // initialise previous row\n      for (i=0; i<str2Len; ++i) {\n        prevRow[i] = i;\n        str2Char[i] = str2.charCodeAt(i);\n      }\n      prevRow[str2Len] = str2Len;\n\n      var strCmp;\n      if (useCollator) {\n        // calculate current row distance from previous row using collator\n        for (i = 0; i < str1Len; ++i) {\n          nextCol = i + 1;\n\n          for (j = 0; j < str2Len; ++j) {\n            curCol = nextCol;\n\n            // substution\n            strCmp = 0 === collator.compare(str1.charAt(i), String.fromCharCode(str2Char[j]));\n\n            nextCol = prevRow[j] + (strCmp ? 0 : 1);\n\n            // insertion\n            tmp = curCol + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n            // deletion\n            tmp = prevRow[j + 1] + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n\n            // copy current col value into previous (in preparation for next iteration)\n            prevRow[j] = curCol;\n          }\n\n          // copy last col value into previous (in preparation for next iteration)\n          prevRow[j] = nextCol;\n        }\n      }\n      else {\n        // calculate current row distance from previous row without collator\n        for (i = 0; i < str1Len; ++i) {\n          nextCol = i + 1;\n\n          for (j = 0; j < str2Len; ++j) {\n            curCol = nextCol;\n\n            // substution\n            strCmp = str1.charCodeAt(i) === str2Char[j];\n\n            nextCol = prevRow[j] + (strCmp ? 0 : 1);\n\n            // insertion\n            tmp = curCol + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n            // deletion\n            tmp = prevRow[j + 1] + 1;\n            if (nextCol > tmp) {\n              nextCol = tmp;\n            }\n\n            // copy current col value into previous (in preparation for next iteration)\n            prevRow[j] = curCol;\n          }\n\n          // copy last col value into previous (in preparation for next iteration)\n          prevRow[j] = nextCol;\n        }\n      }\n      return nextCol;\n    }\n\n  };\n\n  // amd\n  if (\"function\" !== \"undefined\" && __webpack_require__(/*! !webpack amd define */ \"./node_modules/webpack/buildin/amd-define.js\") !== null && __webpack_require__(/*! !webpack amd options */ \"./node_modules/webpack/buildin/amd-options.js\")) {\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n      return Levenshtein;\n    }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  }\n  // commonjs\n  else if (typeof module !== \"undefined\" && module !== null && typeof exports !== \"undefined\" && module.exports === exports) {\n    module.exports = Levenshtein;\n  }\n  // web worker\n  else if (typeof self !== \"undefined\" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {\n    self.Levenshtein = Levenshtein;\n  }\n  // browser main thread\n  else if (typeof window !== \"undefined\" && window !== null) {\n    window.Levenshtein = Levenshtein;\n  }\n}());\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./node_modules/fast-levenshtein/levenshtein.js?");

/***/ }),

/***/ "./node_modules/fetch-everywhere/fetch-npm-browserify.js":
/*!************************************************************************************************************************!*\
  !*** delegated ./node_modules/fetch-everywhere/fetch-npm-browserify.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(225);\n\n//# sourceURL=webpack:///delegated_./node_modules/fetch-everywhere/fetch-npm-browserify.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/history/createBrowserHistory.js":
/*!***************************************************************************************************************!*\
  !*** delegated ./node_modules/history/createBrowserHistory.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(85);\n\n//# sourceURL=webpack:///delegated_./node_modules/history/createBrowserHistory.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!*******************************************************************************************************************************************!*\
  !*** delegated ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(165);\n\n//# sourceURL=webpack:///delegated_./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/html-entities/index.js":
/*!*********************************************!*\
  !*** ./node_modules/html-entities/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = {\n  XmlEntities: __webpack_require__(/*! ./lib/xml-entities.js */ \"./node_modules/html-entities/lib/xml-entities.js\"),\n  Html4Entities: __webpack_require__(/*! ./lib/html4-entities.js */ \"./node_modules/html-entities/lib/html4-entities.js\"),\n  Html5Entities: __webpack_require__(/*! ./lib/html5-entities.js */ \"./node_modules/html-entities/lib/html5-entities.js\"),\n  AllHtmlEntities: __webpack_require__(/*! ./lib/html5-entities.js */ \"./node_modules/html-entities/lib/html5-entities.js\")\n};\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/index.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/html4-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html4-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var HTML_ALPHA = ['apos', 'nbsp', 'iexcl', 'cent', 'pound', 'curren', 'yen', 'brvbar', 'sect', 'uml', 'copy', 'ordf', 'laquo', 'not', 'shy', 'reg', 'macr', 'deg', 'plusmn', 'sup2', 'sup3', 'acute', 'micro', 'para', 'middot', 'cedil', 'sup1', 'ordm', 'raquo', 'frac14', 'frac12', 'frac34', 'iquest', 'Agrave', 'Aacute', 'Acirc', 'Atilde', 'Auml', 'Aring', 'Aelig', 'Ccedil', 'Egrave', 'Eacute', 'Ecirc', 'Euml', 'Igrave', 'Iacute', 'Icirc', 'Iuml', 'ETH', 'Ntilde', 'Ograve', 'Oacute', 'Ocirc', 'Otilde', 'Ouml', 'times', 'Oslash', 'Ugrave', 'Uacute', 'Ucirc', 'Uuml', 'Yacute', 'THORN', 'szlig', 'agrave', 'aacute', 'acirc', 'atilde', 'auml', 'aring', 'aelig', 'ccedil', 'egrave', 'eacute', 'ecirc', 'euml', 'igrave', 'iacute', 'icirc', 'iuml', 'eth', 'ntilde', 'ograve', 'oacute', 'ocirc', 'otilde', 'ouml', 'divide', 'oslash', 'ugrave', 'uacute', 'ucirc', 'uuml', 'yacute', 'thorn', 'yuml', 'quot', 'amp', 'lt', 'gt', 'OElig', 'oelig', 'Scaron', 'scaron', 'Yuml', 'circ', 'tilde', 'ensp', 'emsp', 'thinsp', 'zwnj', 'zwj', 'lrm', 'rlm', 'ndash', 'mdash', 'lsquo', 'rsquo', 'sbquo', 'ldquo', 'rdquo', 'bdquo', 'dagger', 'Dagger', 'permil', 'lsaquo', 'rsaquo', 'euro', 'fnof', 'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega', 'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho', 'sigmaf', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega', 'thetasym', 'upsih', 'piv', 'bull', 'hellip', 'prime', 'Prime', 'oline', 'frasl', 'weierp', 'image', 'real', 'trade', 'alefsym', 'larr', 'uarr', 'rarr', 'darr', 'harr', 'crarr', 'lArr', 'uArr', 'rArr', 'dArr', 'hArr', 'forall', 'part', 'exist', 'empty', 'nabla', 'isin', 'notin', 'ni', 'prod', 'sum', 'minus', 'lowast', 'radic', 'prop', 'infin', 'ang', 'and', 'or', 'cap', 'cup', 'int', 'there4', 'sim', 'cong', 'asymp', 'ne', 'equiv', 'le', 'ge', 'sub', 'sup', 'nsub', 'sube', 'supe', 'oplus', 'otimes', 'perp', 'sdot', 'lceil', 'rceil', 'lfloor', 'rfloor', 'lang', 'rang', 'loz', 'spades', 'clubs', 'hearts', 'diams'];\nvar HTML_CODES = [39, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 34, 38, 60, 62, 338, 339, 352, 353, 376, 710, 732, 8194, 8195, 8201, 8204, 8205, 8206, 8207, 8211, 8212, 8216, 8217, 8218, 8220, 8221, 8222, 8224, 8225, 8240, 8249, 8250, 8364, 402, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929, 931, 932, 933, 934, 935, 936, 937, 945, 946, 947, 948, 949, 950, 951, 952, 953, 954, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968, 969, 977, 978, 982, 8226, 8230, 8242, 8243, 8254, 8260, 8472, 8465, 8476, 8482, 8501, 8592, 8593, 8594, 8595, 8596, 8629, 8656, 8657, 8658, 8659, 8660, 8704, 8706, 8707, 8709, 8711, 8712, 8713, 8715, 8719, 8721, 8722, 8727, 8730, 8733, 8734, 8736, 8743, 8744, 8745, 8746, 8747, 8756, 8764, 8773, 8776, 8800, 8801, 8804, 8805, 8834, 8835, 8836, 8838, 8839, 8853, 8855, 8869, 8901, 8968, 8969, 8970, 8971, 9001, 9002, 9674, 9824, 9827, 9829, 9830];\n\nvar alphaIndex = {};\nvar numIndex = {};\n\nvar i = 0;\nvar length = HTML_ALPHA.length;\nwhile (i < length) {\n    var a = HTML_ALPHA[i];\n    var c = HTML_CODES[i];\n    alphaIndex[a] = String.fromCharCode(c);\n    numIndex[c] = a;\n    i++;\n}\n\n/**\n * @constructor\n */\nfunction Html4Entities() {}\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.decode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/&(#?[\\w\\d]+);?/g, function(s, entity) {\n        var chr;\n        if (entity.charAt(0) === \"#\") {\n            var code = entity.charAt(1).toLowerCase() === 'x' ?\n                parseInt(entity.substr(2), 16) :\n                parseInt(entity.substr(1));\n\n            if (!(isNaN(code) || code < -32768 || code > 65535)) {\n                chr = String.fromCharCode(code);\n            }\n        } else {\n            chr = alphaIndex[entity];\n        }\n        return chr || s;\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.decode = function(str) {\n    return new Html4Entities().decode(str);\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.encode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var alpha = numIndex[str.charCodeAt(i)];\n        result += alpha ? \"&\" + alpha + \";\" : str.charAt(i);\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.encode = function(str) {\n    return new Html4Entities().encode(str);\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.encodeNonUTF = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var cc = str.charCodeAt(i);\n        var alpha = numIndex[cc];\n        if (alpha) {\n            result += \"&\" + alpha + \";\";\n        } else if (cc < 32 || cc > 126) {\n            result += \"&#\" + cc + \";\";\n        } else {\n            result += str.charAt(i);\n        }\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.encodeNonUTF = function(str) {\n    return new Html4Entities().encodeNonUTF(str);\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.prototype.encodeNonASCII = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        if (c <= 255) {\n            result += str[i++];\n            continue;\n        }\n        result += '&#' + c + ';';\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml4Entities.encodeNonASCII = function(str) {\n    return new Html4Entities().encodeNonASCII(str);\n};\n\nmodule.exports = Html4Entities;\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/lib/html4-entities.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/html5-entities.js":
/*!**********************************************************!*\
  !*** ./node_modules/html-entities/lib/html5-entities.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ENTITIES = [['Aacute', [193]], ['aacute', [225]], ['Abreve', [258]], ['abreve', [259]], ['ac', [8766]], ['acd', [8767]], ['acE', [8766, 819]], ['Acirc', [194]], ['acirc', [226]], ['acute', [180]], ['Acy', [1040]], ['acy', [1072]], ['AElig', [198]], ['aelig', [230]], ['af', [8289]], ['Afr', [120068]], ['afr', [120094]], ['Agrave', [192]], ['agrave', [224]], ['alefsym', [8501]], ['aleph', [8501]], ['Alpha', [913]], ['alpha', [945]], ['Amacr', [256]], ['amacr', [257]], ['amalg', [10815]], ['amp', [38]], ['AMP', [38]], ['andand', [10837]], ['And', [10835]], ['and', [8743]], ['andd', [10844]], ['andslope', [10840]], ['andv', [10842]], ['ang', [8736]], ['ange', [10660]], ['angle', [8736]], ['angmsdaa', [10664]], ['angmsdab', [10665]], ['angmsdac', [10666]], ['angmsdad', [10667]], ['angmsdae', [10668]], ['angmsdaf', [10669]], ['angmsdag', [10670]], ['angmsdah', [10671]], ['angmsd', [8737]], ['angrt', [8735]], ['angrtvb', [8894]], ['angrtvbd', [10653]], ['angsph', [8738]], ['angst', [197]], ['angzarr', [9084]], ['Aogon', [260]], ['aogon', [261]], ['Aopf', [120120]], ['aopf', [120146]], ['apacir', [10863]], ['ap', [8776]], ['apE', [10864]], ['ape', [8778]], ['apid', [8779]], ['apos', [39]], ['ApplyFunction', [8289]], ['approx', [8776]], ['approxeq', [8778]], ['Aring', [197]], ['aring', [229]], ['Ascr', [119964]], ['ascr', [119990]], ['Assign', [8788]], ['ast', [42]], ['asymp', [8776]], ['asympeq', [8781]], ['Atilde', [195]], ['atilde', [227]], ['Auml', [196]], ['auml', [228]], ['awconint', [8755]], ['awint', [10769]], ['backcong', [8780]], ['backepsilon', [1014]], ['backprime', [8245]], ['backsim', [8765]], ['backsimeq', [8909]], ['Backslash', [8726]], ['Barv', [10983]], ['barvee', [8893]], ['barwed', [8965]], ['Barwed', [8966]], ['barwedge', [8965]], ['bbrk', [9141]], ['bbrktbrk', [9142]], ['bcong', [8780]], ['Bcy', [1041]], ['bcy', [1073]], ['bdquo', [8222]], ['becaus', [8757]], ['because', [8757]], ['Because', [8757]], ['bemptyv', [10672]], ['bepsi', [1014]], ['bernou', [8492]], ['Bernoullis', [8492]], ['Beta', [914]], ['beta', [946]], ['beth', [8502]], ['between', [8812]], ['Bfr', [120069]], ['bfr', [120095]], ['bigcap', [8898]], ['bigcirc', [9711]], ['bigcup', [8899]], ['bigodot', [10752]], ['bigoplus', [10753]], ['bigotimes', [10754]], ['bigsqcup', [10758]], ['bigstar', [9733]], ['bigtriangledown', [9661]], ['bigtriangleup', [9651]], ['biguplus', [10756]], ['bigvee', [8897]], ['bigwedge', [8896]], ['bkarow', [10509]], ['blacklozenge', [10731]], ['blacksquare', [9642]], ['blacktriangle', [9652]], ['blacktriangledown', [9662]], ['blacktriangleleft', [9666]], ['blacktriangleright', [9656]], ['blank', [9251]], ['blk12', [9618]], ['blk14', [9617]], ['blk34', [9619]], ['block', [9608]], ['bne', [61, 8421]], ['bnequiv', [8801, 8421]], ['bNot', [10989]], ['bnot', [8976]], ['Bopf', [120121]], ['bopf', [120147]], ['bot', [8869]], ['bottom', [8869]], ['bowtie', [8904]], ['boxbox', [10697]], ['boxdl', [9488]], ['boxdL', [9557]], ['boxDl', [9558]], ['boxDL', [9559]], ['boxdr', [9484]], ['boxdR', [9554]], ['boxDr', [9555]], ['boxDR', [9556]], ['boxh', [9472]], ['boxH', [9552]], ['boxhd', [9516]], ['boxHd', [9572]], ['boxhD', [9573]], ['boxHD', [9574]], ['boxhu', [9524]], ['boxHu', [9575]], ['boxhU', [9576]], ['boxHU', [9577]], ['boxminus', [8863]], ['boxplus', [8862]], ['boxtimes', [8864]], ['boxul', [9496]], ['boxuL', [9563]], ['boxUl', [9564]], ['boxUL', [9565]], ['boxur', [9492]], ['boxuR', [9560]], ['boxUr', [9561]], ['boxUR', [9562]], ['boxv', [9474]], ['boxV', [9553]], ['boxvh', [9532]], ['boxvH', [9578]], ['boxVh', [9579]], ['boxVH', [9580]], ['boxvl', [9508]], ['boxvL', [9569]], ['boxVl', [9570]], ['boxVL', [9571]], ['boxvr', [9500]], ['boxvR', [9566]], ['boxVr', [9567]], ['boxVR', [9568]], ['bprime', [8245]], ['breve', [728]], ['Breve', [728]], ['brvbar', [166]], ['bscr', [119991]], ['Bscr', [8492]], ['bsemi', [8271]], ['bsim', [8765]], ['bsime', [8909]], ['bsolb', [10693]], ['bsol', [92]], ['bsolhsub', [10184]], ['bull', [8226]], ['bullet', [8226]], ['bump', [8782]], ['bumpE', [10926]], ['bumpe', [8783]], ['Bumpeq', [8782]], ['bumpeq', [8783]], ['Cacute', [262]], ['cacute', [263]], ['capand', [10820]], ['capbrcup', [10825]], ['capcap', [10827]], ['cap', [8745]], ['Cap', [8914]], ['capcup', [10823]], ['capdot', [10816]], ['CapitalDifferentialD', [8517]], ['caps', [8745, 65024]], ['caret', [8257]], ['caron', [711]], ['Cayleys', [8493]], ['ccaps', [10829]], ['Ccaron', [268]], ['ccaron', [269]], ['Ccedil', [199]], ['ccedil', [231]], ['Ccirc', [264]], ['ccirc', [265]], ['Cconint', [8752]], ['ccups', [10828]], ['ccupssm', [10832]], ['Cdot', [266]], ['cdot', [267]], ['cedil', [184]], ['Cedilla', [184]], ['cemptyv', [10674]], ['cent', [162]], ['centerdot', [183]], ['CenterDot', [183]], ['cfr', [120096]], ['Cfr', [8493]], ['CHcy', [1063]], ['chcy', [1095]], ['check', [10003]], ['checkmark', [10003]], ['Chi', [935]], ['chi', [967]], ['circ', [710]], ['circeq', [8791]], ['circlearrowleft', [8634]], ['circlearrowright', [8635]], ['circledast', [8859]], ['circledcirc', [8858]], ['circleddash', [8861]], ['CircleDot', [8857]], ['circledR', [174]], ['circledS', [9416]], ['CircleMinus', [8854]], ['CirclePlus', [8853]], ['CircleTimes', [8855]], ['cir', [9675]], ['cirE', [10691]], ['cire', [8791]], ['cirfnint', [10768]], ['cirmid', [10991]], ['cirscir', [10690]], ['ClockwiseContourIntegral', [8754]], ['clubs', [9827]], ['clubsuit', [9827]], ['colon', [58]], ['Colon', [8759]], ['Colone', [10868]], ['colone', [8788]], ['coloneq', [8788]], ['comma', [44]], ['commat', [64]], ['comp', [8705]], ['compfn', [8728]], ['complement', [8705]], ['complexes', [8450]], ['cong', [8773]], ['congdot', [10861]], ['Congruent', [8801]], ['conint', [8750]], ['Conint', [8751]], ['ContourIntegral', [8750]], ['copf', [120148]], ['Copf', [8450]], ['coprod', [8720]], ['Coproduct', [8720]], ['copy', [169]], ['COPY', [169]], ['copysr', [8471]], ['CounterClockwiseContourIntegral', [8755]], ['crarr', [8629]], ['cross', [10007]], ['Cross', [10799]], ['Cscr', [119966]], ['cscr', [119992]], ['csub', [10959]], ['csube', [10961]], ['csup', [10960]], ['csupe', [10962]], ['ctdot', [8943]], ['cudarrl', [10552]], ['cudarrr', [10549]], ['cuepr', [8926]], ['cuesc', [8927]], ['cularr', [8630]], ['cularrp', [10557]], ['cupbrcap', [10824]], ['cupcap', [10822]], ['CupCap', [8781]], ['cup', [8746]], ['Cup', [8915]], ['cupcup', [10826]], ['cupdot', [8845]], ['cupor', [10821]], ['cups', [8746, 65024]], ['curarr', [8631]], ['curarrm', [10556]], ['curlyeqprec', [8926]], ['curlyeqsucc', [8927]], ['curlyvee', [8910]], ['curlywedge', [8911]], ['curren', [164]], ['curvearrowleft', [8630]], ['curvearrowright', [8631]], ['cuvee', [8910]], ['cuwed', [8911]], ['cwconint', [8754]], ['cwint', [8753]], ['cylcty', [9005]], ['dagger', [8224]], ['Dagger', [8225]], ['daleth', [8504]], ['darr', [8595]], ['Darr', [8609]], ['dArr', [8659]], ['dash', [8208]], ['Dashv', [10980]], ['dashv', [8867]], ['dbkarow', [10511]], ['dblac', [733]], ['Dcaron', [270]], ['dcaron', [271]], ['Dcy', [1044]], ['dcy', [1076]], ['ddagger', [8225]], ['ddarr', [8650]], ['DD', [8517]], ['dd', [8518]], ['DDotrahd', [10513]], ['ddotseq', [10871]], ['deg', [176]], ['Del', [8711]], ['Delta', [916]], ['delta', [948]], ['demptyv', [10673]], ['dfisht', [10623]], ['Dfr', [120071]], ['dfr', [120097]], ['dHar', [10597]], ['dharl', [8643]], ['dharr', [8642]], ['DiacriticalAcute', [180]], ['DiacriticalDot', [729]], ['DiacriticalDoubleAcute', [733]], ['DiacriticalGrave', [96]], ['DiacriticalTilde', [732]], ['diam', [8900]], ['diamond', [8900]], ['Diamond', [8900]], ['diamondsuit', [9830]], ['diams', [9830]], ['die', [168]], ['DifferentialD', [8518]], ['digamma', [989]], ['disin', [8946]], ['div', [247]], ['divide', [247]], ['divideontimes', [8903]], ['divonx', [8903]], ['DJcy', [1026]], ['djcy', [1106]], ['dlcorn', [8990]], ['dlcrop', [8973]], ['dollar', [36]], ['Dopf', [120123]], ['dopf', [120149]], ['Dot', [168]], ['dot', [729]], ['DotDot', [8412]], ['doteq', [8784]], ['doteqdot', [8785]], ['DotEqual', [8784]], ['dotminus', [8760]], ['dotplus', [8724]], ['dotsquare', [8865]], ['doublebarwedge', [8966]], ['DoubleContourIntegral', [8751]], ['DoubleDot', [168]], ['DoubleDownArrow', [8659]], ['DoubleLeftArrow', [8656]], ['DoubleLeftRightArrow', [8660]], ['DoubleLeftTee', [10980]], ['DoubleLongLeftArrow', [10232]], ['DoubleLongLeftRightArrow', [10234]], ['DoubleLongRightArrow', [10233]], ['DoubleRightArrow', [8658]], ['DoubleRightTee', [8872]], ['DoubleUpArrow', [8657]], ['DoubleUpDownArrow', [8661]], ['DoubleVerticalBar', [8741]], ['DownArrowBar', [10515]], ['downarrow', [8595]], ['DownArrow', [8595]], ['Downarrow', [8659]], ['DownArrowUpArrow', [8693]], ['DownBreve', [785]], ['downdownarrows', [8650]], ['downharpoonleft', [8643]], ['downharpoonright', [8642]], ['DownLeftRightVector', [10576]], ['DownLeftTeeVector', [10590]], ['DownLeftVectorBar', [10582]], ['DownLeftVector', [8637]], ['DownRightTeeVector', [10591]], ['DownRightVectorBar', [10583]], ['DownRightVector', [8641]], ['DownTeeArrow', [8615]], ['DownTee', [8868]], ['drbkarow', [10512]], ['drcorn', [8991]], ['drcrop', [8972]], ['Dscr', [119967]], ['dscr', [119993]], ['DScy', [1029]], ['dscy', [1109]], ['dsol', [10742]], ['Dstrok', [272]], ['dstrok', [273]], ['dtdot', [8945]], ['dtri', [9663]], ['dtrif', [9662]], ['duarr', [8693]], ['duhar', [10607]], ['dwangle', [10662]], ['DZcy', [1039]], ['dzcy', [1119]], ['dzigrarr', [10239]], ['Eacute', [201]], ['eacute', [233]], ['easter', [10862]], ['Ecaron', [282]], ['ecaron', [283]], ['Ecirc', [202]], ['ecirc', [234]], ['ecir', [8790]], ['ecolon', [8789]], ['Ecy', [1069]], ['ecy', [1101]], ['eDDot', [10871]], ['Edot', [278]], ['edot', [279]], ['eDot', [8785]], ['ee', [8519]], ['efDot', [8786]], ['Efr', [120072]], ['efr', [120098]], ['eg', [10906]], ['Egrave', [200]], ['egrave', [232]], ['egs', [10902]], ['egsdot', [10904]], ['el', [10905]], ['Element', [8712]], ['elinters', [9191]], ['ell', [8467]], ['els', [10901]], ['elsdot', [10903]], ['Emacr', [274]], ['emacr', [275]], ['empty', [8709]], ['emptyset', [8709]], ['EmptySmallSquare', [9723]], ['emptyv', [8709]], ['EmptyVerySmallSquare', [9643]], ['emsp13', [8196]], ['emsp14', [8197]], ['emsp', [8195]], ['ENG', [330]], ['eng', [331]], ['ensp', [8194]], ['Eogon', [280]], ['eogon', [281]], ['Eopf', [120124]], ['eopf', [120150]], ['epar', [8917]], ['eparsl', [10723]], ['eplus', [10865]], ['epsi', [949]], ['Epsilon', [917]], ['epsilon', [949]], ['epsiv', [1013]], ['eqcirc', [8790]], ['eqcolon', [8789]], ['eqsim', [8770]], ['eqslantgtr', [10902]], ['eqslantless', [10901]], ['Equal', [10869]], ['equals', [61]], ['EqualTilde', [8770]], ['equest', [8799]], ['Equilibrium', [8652]], ['equiv', [8801]], ['equivDD', [10872]], ['eqvparsl', [10725]], ['erarr', [10609]], ['erDot', [8787]], ['escr', [8495]], ['Escr', [8496]], ['esdot', [8784]], ['Esim', [10867]], ['esim', [8770]], ['Eta', [919]], ['eta', [951]], ['ETH', [208]], ['eth', [240]], ['Euml', [203]], ['euml', [235]], ['euro', [8364]], ['excl', [33]], ['exist', [8707]], ['Exists', [8707]], ['expectation', [8496]], ['exponentiale', [8519]], ['ExponentialE', [8519]], ['fallingdotseq', [8786]], ['Fcy', [1060]], ['fcy', [1092]], ['female', [9792]], ['ffilig', [64259]], ['fflig', [64256]], ['ffllig', [64260]], ['Ffr', [120073]], ['ffr', [120099]], ['filig', [64257]], ['FilledSmallSquare', [9724]], ['FilledVerySmallSquare', [9642]], ['fjlig', [102, 106]], ['flat', [9837]], ['fllig', [64258]], ['fltns', [9649]], ['fnof', [402]], ['Fopf', [120125]], ['fopf', [120151]], ['forall', [8704]], ['ForAll', [8704]], ['fork', [8916]], ['forkv', [10969]], ['Fouriertrf', [8497]], ['fpartint', [10765]], ['frac12', [189]], ['frac13', [8531]], ['frac14', [188]], ['frac15', [8533]], ['frac16', [8537]], ['frac18', [8539]], ['frac23', [8532]], ['frac25', [8534]], ['frac34', [190]], ['frac35', [8535]], ['frac38', [8540]], ['frac45', [8536]], ['frac56', [8538]], ['frac58', [8541]], ['frac78', [8542]], ['frasl', [8260]], ['frown', [8994]], ['fscr', [119995]], ['Fscr', [8497]], ['gacute', [501]], ['Gamma', [915]], ['gamma', [947]], ['Gammad', [988]], ['gammad', [989]], ['gap', [10886]], ['Gbreve', [286]], ['gbreve', [287]], ['Gcedil', [290]], ['Gcirc', [284]], ['gcirc', [285]], ['Gcy', [1043]], ['gcy', [1075]], ['Gdot', [288]], ['gdot', [289]], ['ge', [8805]], ['gE', [8807]], ['gEl', [10892]], ['gel', [8923]], ['geq', [8805]], ['geqq', [8807]], ['geqslant', [10878]], ['gescc', [10921]], ['ges', [10878]], ['gesdot', [10880]], ['gesdoto', [10882]], ['gesdotol', [10884]], ['gesl', [8923, 65024]], ['gesles', [10900]], ['Gfr', [120074]], ['gfr', [120100]], ['gg', [8811]], ['Gg', [8921]], ['ggg', [8921]], ['gimel', [8503]], ['GJcy', [1027]], ['gjcy', [1107]], ['gla', [10917]], ['gl', [8823]], ['glE', [10898]], ['glj', [10916]], ['gnap', [10890]], ['gnapprox', [10890]], ['gne', [10888]], ['gnE', [8809]], ['gneq', [10888]], ['gneqq', [8809]], ['gnsim', [8935]], ['Gopf', [120126]], ['gopf', [120152]], ['grave', [96]], ['GreaterEqual', [8805]], ['GreaterEqualLess', [8923]], ['GreaterFullEqual', [8807]], ['GreaterGreater', [10914]], ['GreaterLess', [8823]], ['GreaterSlantEqual', [10878]], ['GreaterTilde', [8819]], ['Gscr', [119970]], ['gscr', [8458]], ['gsim', [8819]], ['gsime', [10894]], ['gsiml', [10896]], ['gtcc', [10919]], ['gtcir', [10874]], ['gt', [62]], ['GT', [62]], ['Gt', [8811]], ['gtdot', [8919]], ['gtlPar', [10645]], ['gtquest', [10876]], ['gtrapprox', [10886]], ['gtrarr', [10616]], ['gtrdot', [8919]], ['gtreqless', [8923]], ['gtreqqless', [10892]], ['gtrless', [8823]], ['gtrsim', [8819]], ['gvertneqq', [8809, 65024]], ['gvnE', [8809, 65024]], ['Hacek', [711]], ['hairsp', [8202]], ['half', [189]], ['hamilt', [8459]], ['HARDcy', [1066]], ['hardcy', [1098]], ['harrcir', [10568]], ['harr', [8596]], ['hArr', [8660]], ['harrw', [8621]], ['Hat', [94]], ['hbar', [8463]], ['Hcirc', [292]], ['hcirc', [293]], ['hearts', [9829]], ['heartsuit', [9829]], ['hellip', [8230]], ['hercon', [8889]], ['hfr', [120101]], ['Hfr', [8460]], ['HilbertSpace', [8459]], ['hksearow', [10533]], ['hkswarow', [10534]], ['hoarr', [8703]], ['homtht', [8763]], ['hookleftarrow', [8617]], ['hookrightarrow', [8618]], ['hopf', [120153]], ['Hopf', [8461]], ['horbar', [8213]], ['HorizontalLine', [9472]], ['hscr', [119997]], ['Hscr', [8459]], ['hslash', [8463]], ['Hstrok', [294]], ['hstrok', [295]], ['HumpDownHump', [8782]], ['HumpEqual', [8783]], ['hybull', [8259]], ['hyphen', [8208]], ['Iacute', [205]], ['iacute', [237]], ['ic', [8291]], ['Icirc', [206]], ['icirc', [238]], ['Icy', [1048]], ['icy', [1080]], ['Idot', [304]], ['IEcy', [1045]], ['iecy', [1077]], ['iexcl', [161]], ['iff', [8660]], ['ifr', [120102]], ['Ifr', [8465]], ['Igrave', [204]], ['igrave', [236]], ['ii', [8520]], ['iiiint', [10764]], ['iiint', [8749]], ['iinfin', [10716]], ['iiota', [8489]], ['IJlig', [306]], ['ijlig', [307]], ['Imacr', [298]], ['imacr', [299]], ['image', [8465]], ['ImaginaryI', [8520]], ['imagline', [8464]], ['imagpart', [8465]], ['imath', [305]], ['Im', [8465]], ['imof', [8887]], ['imped', [437]], ['Implies', [8658]], ['incare', [8453]], ['in', [8712]], ['infin', [8734]], ['infintie', [10717]], ['inodot', [305]], ['intcal', [8890]], ['int', [8747]], ['Int', [8748]], ['integers', [8484]], ['Integral', [8747]], ['intercal', [8890]], ['Intersection', [8898]], ['intlarhk', [10775]], ['intprod', [10812]], ['InvisibleComma', [8291]], ['InvisibleTimes', [8290]], ['IOcy', [1025]], ['iocy', [1105]], ['Iogon', [302]], ['iogon', [303]], ['Iopf', [120128]], ['iopf', [120154]], ['Iota', [921]], ['iota', [953]], ['iprod', [10812]], ['iquest', [191]], ['iscr', [119998]], ['Iscr', [8464]], ['isin', [8712]], ['isindot', [8949]], ['isinE', [8953]], ['isins', [8948]], ['isinsv', [8947]], ['isinv', [8712]], ['it', [8290]], ['Itilde', [296]], ['itilde', [297]], ['Iukcy', [1030]], ['iukcy', [1110]], ['Iuml', [207]], ['iuml', [239]], ['Jcirc', [308]], ['jcirc', [309]], ['Jcy', [1049]], ['jcy', [1081]], ['Jfr', [120077]], ['jfr', [120103]], ['jmath', [567]], ['Jopf', [120129]], ['jopf', [120155]], ['Jscr', [119973]], ['jscr', [119999]], ['Jsercy', [1032]], ['jsercy', [1112]], ['Jukcy', [1028]], ['jukcy', [1108]], ['Kappa', [922]], ['kappa', [954]], ['kappav', [1008]], ['Kcedil', [310]], ['kcedil', [311]], ['Kcy', [1050]], ['kcy', [1082]], ['Kfr', [120078]], ['kfr', [120104]], ['kgreen', [312]], ['KHcy', [1061]], ['khcy', [1093]], ['KJcy', [1036]], ['kjcy', [1116]], ['Kopf', [120130]], ['kopf', [120156]], ['Kscr', [119974]], ['kscr', [120000]], ['lAarr', [8666]], ['Lacute', [313]], ['lacute', [314]], ['laemptyv', [10676]], ['lagran', [8466]], ['Lambda', [923]], ['lambda', [955]], ['lang', [10216]], ['Lang', [10218]], ['langd', [10641]], ['langle', [10216]], ['lap', [10885]], ['Laplacetrf', [8466]], ['laquo', [171]], ['larrb', [8676]], ['larrbfs', [10527]], ['larr', [8592]], ['Larr', [8606]], ['lArr', [8656]], ['larrfs', [10525]], ['larrhk', [8617]], ['larrlp', [8619]], ['larrpl', [10553]], ['larrsim', [10611]], ['larrtl', [8610]], ['latail', [10521]], ['lAtail', [10523]], ['lat', [10923]], ['late', [10925]], ['lates', [10925, 65024]], ['lbarr', [10508]], ['lBarr', [10510]], ['lbbrk', [10098]], ['lbrace', [123]], ['lbrack', [91]], ['lbrke', [10635]], ['lbrksld', [10639]], ['lbrkslu', [10637]], ['Lcaron', [317]], ['lcaron', [318]], ['Lcedil', [315]], ['lcedil', [316]], ['lceil', [8968]], ['lcub', [123]], ['Lcy', [1051]], ['lcy', [1083]], ['ldca', [10550]], ['ldquo', [8220]], ['ldquor', [8222]], ['ldrdhar', [10599]], ['ldrushar', [10571]], ['ldsh', [8626]], ['le', [8804]], ['lE', [8806]], ['LeftAngleBracket', [10216]], ['LeftArrowBar', [8676]], ['leftarrow', [8592]], ['LeftArrow', [8592]], ['Leftarrow', [8656]], ['LeftArrowRightArrow', [8646]], ['leftarrowtail', [8610]], ['LeftCeiling', [8968]], ['LeftDoubleBracket', [10214]], ['LeftDownTeeVector', [10593]], ['LeftDownVectorBar', [10585]], ['LeftDownVector', [8643]], ['LeftFloor', [8970]], ['leftharpoondown', [8637]], ['leftharpoonup', [8636]], ['leftleftarrows', [8647]], ['leftrightarrow', [8596]], ['LeftRightArrow', [8596]], ['Leftrightarrow', [8660]], ['leftrightarrows', [8646]], ['leftrightharpoons', [8651]], ['leftrightsquigarrow', [8621]], ['LeftRightVector', [10574]], ['LeftTeeArrow', [8612]], ['LeftTee', [8867]], ['LeftTeeVector', [10586]], ['leftthreetimes', [8907]], ['LeftTriangleBar', [10703]], ['LeftTriangle', [8882]], ['LeftTriangleEqual', [8884]], ['LeftUpDownVector', [10577]], ['LeftUpTeeVector', [10592]], ['LeftUpVectorBar', [10584]], ['LeftUpVector', [8639]], ['LeftVectorBar', [10578]], ['LeftVector', [8636]], ['lEg', [10891]], ['leg', [8922]], ['leq', [8804]], ['leqq', [8806]], ['leqslant', [10877]], ['lescc', [10920]], ['les', [10877]], ['lesdot', [10879]], ['lesdoto', [10881]], ['lesdotor', [10883]], ['lesg', [8922, 65024]], ['lesges', [10899]], ['lessapprox', [10885]], ['lessdot', [8918]], ['lesseqgtr', [8922]], ['lesseqqgtr', [10891]], ['LessEqualGreater', [8922]], ['LessFullEqual', [8806]], ['LessGreater', [8822]], ['lessgtr', [8822]], ['LessLess', [10913]], ['lesssim', [8818]], ['LessSlantEqual', [10877]], ['LessTilde', [8818]], ['lfisht', [10620]], ['lfloor', [8970]], ['Lfr', [120079]], ['lfr', [120105]], ['lg', [8822]], ['lgE', [10897]], ['lHar', [10594]], ['lhard', [8637]], ['lharu', [8636]], ['lharul', [10602]], ['lhblk', [9604]], ['LJcy', [1033]], ['ljcy', [1113]], ['llarr', [8647]], ['ll', [8810]], ['Ll', [8920]], ['llcorner', [8990]], ['Lleftarrow', [8666]], ['llhard', [10603]], ['lltri', [9722]], ['Lmidot', [319]], ['lmidot', [320]], ['lmoustache', [9136]], ['lmoust', [9136]], ['lnap', [10889]], ['lnapprox', [10889]], ['lne', [10887]], ['lnE', [8808]], ['lneq', [10887]], ['lneqq', [8808]], ['lnsim', [8934]], ['loang', [10220]], ['loarr', [8701]], ['lobrk', [10214]], ['longleftarrow', [10229]], ['LongLeftArrow', [10229]], ['Longleftarrow', [10232]], ['longleftrightarrow', [10231]], ['LongLeftRightArrow', [10231]], ['Longleftrightarrow', [10234]], ['longmapsto', [10236]], ['longrightarrow', [10230]], ['LongRightArrow', [10230]], ['Longrightarrow', [10233]], ['looparrowleft', [8619]], ['looparrowright', [8620]], ['lopar', [10629]], ['Lopf', [120131]], ['lopf', [120157]], ['loplus', [10797]], ['lotimes', [10804]], ['lowast', [8727]], ['lowbar', [95]], ['LowerLeftArrow', [8601]], ['LowerRightArrow', [8600]], ['loz', [9674]], ['lozenge', [9674]], ['lozf', [10731]], ['lpar', [40]], ['lparlt', [10643]], ['lrarr', [8646]], ['lrcorner', [8991]], ['lrhar', [8651]], ['lrhard', [10605]], ['lrm', [8206]], ['lrtri', [8895]], ['lsaquo', [8249]], ['lscr', [120001]], ['Lscr', [8466]], ['lsh', [8624]], ['Lsh', [8624]], ['lsim', [8818]], ['lsime', [10893]], ['lsimg', [10895]], ['lsqb', [91]], ['lsquo', [8216]], ['lsquor', [8218]], ['Lstrok', [321]], ['lstrok', [322]], ['ltcc', [10918]], ['ltcir', [10873]], ['lt', [60]], ['LT', [60]], ['Lt', [8810]], ['ltdot', [8918]], ['lthree', [8907]], ['ltimes', [8905]], ['ltlarr', [10614]], ['ltquest', [10875]], ['ltri', [9667]], ['ltrie', [8884]], ['ltrif', [9666]], ['ltrPar', [10646]], ['lurdshar', [10570]], ['luruhar', [10598]], ['lvertneqq', [8808, 65024]], ['lvnE', [8808, 65024]], ['macr', [175]], ['male', [9794]], ['malt', [10016]], ['maltese', [10016]], ['Map', [10501]], ['map', [8614]], ['mapsto', [8614]], ['mapstodown', [8615]], ['mapstoleft', [8612]], ['mapstoup', [8613]], ['marker', [9646]], ['mcomma', [10793]], ['Mcy', [1052]], ['mcy', [1084]], ['mdash', [8212]], ['mDDot', [8762]], ['measuredangle', [8737]], ['MediumSpace', [8287]], ['Mellintrf', [8499]], ['Mfr', [120080]], ['mfr', [120106]], ['mho', [8487]], ['micro', [181]], ['midast', [42]], ['midcir', [10992]], ['mid', [8739]], ['middot', [183]], ['minusb', [8863]], ['minus', [8722]], ['minusd', [8760]], ['minusdu', [10794]], ['MinusPlus', [8723]], ['mlcp', [10971]], ['mldr', [8230]], ['mnplus', [8723]], ['models', [8871]], ['Mopf', [120132]], ['mopf', [120158]], ['mp', [8723]], ['mscr', [120002]], ['Mscr', [8499]], ['mstpos', [8766]], ['Mu', [924]], ['mu', [956]], ['multimap', [8888]], ['mumap', [8888]], ['nabla', [8711]], ['Nacute', [323]], ['nacute', [324]], ['nang', [8736, 8402]], ['nap', [8777]], ['napE', [10864, 824]], ['napid', [8779, 824]], ['napos', [329]], ['napprox', [8777]], ['natural', [9838]], ['naturals', [8469]], ['natur', [9838]], ['nbsp', [160]], ['nbump', [8782, 824]], ['nbumpe', [8783, 824]], ['ncap', [10819]], ['Ncaron', [327]], ['ncaron', [328]], ['Ncedil', [325]], ['ncedil', [326]], ['ncong', [8775]], ['ncongdot', [10861, 824]], ['ncup', [10818]], ['Ncy', [1053]], ['ncy', [1085]], ['ndash', [8211]], ['nearhk', [10532]], ['nearr', [8599]], ['neArr', [8663]], ['nearrow', [8599]], ['ne', [8800]], ['nedot', [8784, 824]], ['NegativeMediumSpace', [8203]], ['NegativeThickSpace', [8203]], ['NegativeThinSpace', [8203]], ['NegativeVeryThinSpace', [8203]], ['nequiv', [8802]], ['nesear', [10536]], ['nesim', [8770, 824]], ['NestedGreaterGreater', [8811]], ['NestedLessLess', [8810]], ['nexist', [8708]], ['nexists', [8708]], ['Nfr', [120081]], ['nfr', [120107]], ['ngE', [8807, 824]], ['nge', [8817]], ['ngeq', [8817]], ['ngeqq', [8807, 824]], ['ngeqslant', [10878, 824]], ['nges', [10878, 824]], ['nGg', [8921, 824]], ['ngsim', [8821]], ['nGt', [8811, 8402]], ['ngt', [8815]], ['ngtr', [8815]], ['nGtv', [8811, 824]], ['nharr', [8622]], ['nhArr', [8654]], ['nhpar', [10994]], ['ni', [8715]], ['nis', [8956]], ['nisd', [8954]], ['niv', [8715]], ['NJcy', [1034]], ['njcy', [1114]], ['nlarr', [8602]], ['nlArr', [8653]], ['nldr', [8229]], ['nlE', [8806, 824]], ['nle', [8816]], ['nleftarrow', [8602]], ['nLeftarrow', [8653]], ['nleftrightarrow', [8622]], ['nLeftrightarrow', [8654]], ['nleq', [8816]], ['nleqq', [8806, 824]], ['nleqslant', [10877, 824]], ['nles', [10877, 824]], ['nless', [8814]], ['nLl', [8920, 824]], ['nlsim', [8820]], ['nLt', [8810, 8402]], ['nlt', [8814]], ['nltri', [8938]], ['nltrie', [8940]], ['nLtv', [8810, 824]], ['nmid', [8740]], ['NoBreak', [8288]], ['NonBreakingSpace', [160]], ['nopf', [120159]], ['Nopf', [8469]], ['Not', [10988]], ['not', [172]], ['NotCongruent', [8802]], ['NotCupCap', [8813]], ['NotDoubleVerticalBar', [8742]], ['NotElement', [8713]], ['NotEqual', [8800]], ['NotEqualTilde', [8770, 824]], ['NotExists', [8708]], ['NotGreater', [8815]], ['NotGreaterEqual', [8817]], ['NotGreaterFullEqual', [8807, 824]], ['NotGreaterGreater', [8811, 824]], ['NotGreaterLess', [8825]], ['NotGreaterSlantEqual', [10878, 824]], ['NotGreaterTilde', [8821]], ['NotHumpDownHump', [8782, 824]], ['NotHumpEqual', [8783, 824]], ['notin', [8713]], ['notindot', [8949, 824]], ['notinE', [8953, 824]], ['notinva', [8713]], ['notinvb', [8951]], ['notinvc', [8950]], ['NotLeftTriangleBar', [10703, 824]], ['NotLeftTriangle', [8938]], ['NotLeftTriangleEqual', [8940]], ['NotLess', [8814]], ['NotLessEqual', [8816]], ['NotLessGreater', [8824]], ['NotLessLess', [8810, 824]], ['NotLessSlantEqual', [10877, 824]], ['NotLessTilde', [8820]], ['NotNestedGreaterGreater', [10914, 824]], ['NotNestedLessLess', [10913, 824]], ['notni', [8716]], ['notniva', [8716]], ['notnivb', [8958]], ['notnivc', [8957]], ['NotPrecedes', [8832]], ['NotPrecedesEqual', [10927, 824]], ['NotPrecedesSlantEqual', [8928]], ['NotReverseElement', [8716]], ['NotRightTriangleBar', [10704, 824]], ['NotRightTriangle', [8939]], ['NotRightTriangleEqual', [8941]], ['NotSquareSubset', [8847, 824]], ['NotSquareSubsetEqual', [8930]], ['NotSquareSuperset', [8848, 824]], ['NotSquareSupersetEqual', [8931]], ['NotSubset', [8834, 8402]], ['NotSubsetEqual', [8840]], ['NotSucceeds', [8833]], ['NotSucceedsEqual', [10928, 824]], ['NotSucceedsSlantEqual', [8929]], ['NotSucceedsTilde', [8831, 824]], ['NotSuperset', [8835, 8402]], ['NotSupersetEqual', [8841]], ['NotTilde', [8769]], ['NotTildeEqual', [8772]], ['NotTildeFullEqual', [8775]], ['NotTildeTilde', [8777]], ['NotVerticalBar', [8740]], ['nparallel', [8742]], ['npar', [8742]], ['nparsl', [11005, 8421]], ['npart', [8706, 824]], ['npolint', [10772]], ['npr', [8832]], ['nprcue', [8928]], ['nprec', [8832]], ['npreceq', [10927, 824]], ['npre', [10927, 824]], ['nrarrc', [10547, 824]], ['nrarr', [8603]], ['nrArr', [8655]], ['nrarrw', [8605, 824]], ['nrightarrow', [8603]], ['nRightarrow', [8655]], ['nrtri', [8939]], ['nrtrie', [8941]], ['nsc', [8833]], ['nsccue', [8929]], ['nsce', [10928, 824]], ['Nscr', [119977]], ['nscr', [120003]], ['nshortmid', [8740]], ['nshortparallel', [8742]], ['nsim', [8769]], ['nsime', [8772]], ['nsimeq', [8772]], ['nsmid', [8740]], ['nspar', [8742]], ['nsqsube', [8930]], ['nsqsupe', [8931]], ['nsub', [8836]], ['nsubE', [10949, 824]], ['nsube', [8840]], ['nsubset', [8834, 8402]], ['nsubseteq', [8840]], ['nsubseteqq', [10949, 824]], ['nsucc', [8833]], ['nsucceq', [10928, 824]], ['nsup', [8837]], ['nsupE', [10950, 824]], ['nsupe', [8841]], ['nsupset', [8835, 8402]], ['nsupseteq', [8841]], ['nsupseteqq', [10950, 824]], ['ntgl', [8825]], ['Ntilde', [209]], ['ntilde', [241]], ['ntlg', [8824]], ['ntriangleleft', [8938]], ['ntrianglelefteq', [8940]], ['ntriangleright', [8939]], ['ntrianglerighteq', [8941]], ['Nu', [925]], ['nu', [957]], ['num', [35]], ['numero', [8470]], ['numsp', [8199]], ['nvap', [8781, 8402]], ['nvdash', [8876]], ['nvDash', [8877]], ['nVdash', [8878]], ['nVDash', [8879]], ['nvge', [8805, 8402]], ['nvgt', [62, 8402]], ['nvHarr', [10500]], ['nvinfin', [10718]], ['nvlArr', [10498]], ['nvle', [8804, 8402]], ['nvlt', [60, 8402]], ['nvltrie', [8884, 8402]], ['nvrArr', [10499]], ['nvrtrie', [8885, 8402]], ['nvsim', [8764, 8402]], ['nwarhk', [10531]], ['nwarr', [8598]], ['nwArr', [8662]], ['nwarrow', [8598]], ['nwnear', [10535]], ['Oacute', [211]], ['oacute', [243]], ['oast', [8859]], ['Ocirc', [212]], ['ocirc', [244]], ['ocir', [8858]], ['Ocy', [1054]], ['ocy', [1086]], ['odash', [8861]], ['Odblac', [336]], ['odblac', [337]], ['odiv', [10808]], ['odot', [8857]], ['odsold', [10684]], ['OElig', [338]], ['oelig', [339]], ['ofcir', [10687]], ['Ofr', [120082]], ['ofr', [120108]], ['ogon', [731]], ['Ograve', [210]], ['ograve', [242]], ['ogt', [10689]], ['ohbar', [10677]], ['ohm', [937]], ['oint', [8750]], ['olarr', [8634]], ['olcir', [10686]], ['olcross', [10683]], ['oline', [8254]], ['olt', [10688]], ['Omacr', [332]], ['omacr', [333]], ['Omega', [937]], ['omega', [969]], ['Omicron', [927]], ['omicron', [959]], ['omid', [10678]], ['ominus', [8854]], ['Oopf', [120134]], ['oopf', [120160]], ['opar', [10679]], ['OpenCurlyDoubleQuote', [8220]], ['OpenCurlyQuote', [8216]], ['operp', [10681]], ['oplus', [8853]], ['orarr', [8635]], ['Or', [10836]], ['or', [8744]], ['ord', [10845]], ['order', [8500]], ['orderof', [8500]], ['ordf', [170]], ['ordm', [186]], ['origof', [8886]], ['oror', [10838]], ['orslope', [10839]], ['orv', [10843]], ['oS', [9416]], ['Oscr', [119978]], ['oscr', [8500]], ['Oslash', [216]], ['oslash', [248]], ['osol', [8856]], ['Otilde', [213]], ['otilde', [245]], ['otimesas', [10806]], ['Otimes', [10807]], ['otimes', [8855]], ['Ouml', [214]], ['ouml', [246]], ['ovbar', [9021]], ['OverBar', [8254]], ['OverBrace', [9182]], ['OverBracket', [9140]], ['OverParenthesis', [9180]], ['para', [182]], ['parallel', [8741]], ['par', [8741]], ['parsim', [10995]], ['parsl', [11005]], ['part', [8706]], ['PartialD', [8706]], ['Pcy', [1055]], ['pcy', [1087]], ['percnt', [37]], ['period', [46]], ['permil', [8240]], ['perp', [8869]], ['pertenk', [8241]], ['Pfr', [120083]], ['pfr', [120109]], ['Phi', [934]], ['phi', [966]], ['phiv', [981]], ['phmmat', [8499]], ['phone', [9742]], ['Pi', [928]], ['pi', [960]], ['pitchfork', [8916]], ['piv', [982]], ['planck', [8463]], ['planckh', [8462]], ['plankv', [8463]], ['plusacir', [10787]], ['plusb', [8862]], ['pluscir', [10786]], ['plus', [43]], ['plusdo', [8724]], ['plusdu', [10789]], ['pluse', [10866]], ['PlusMinus', [177]], ['plusmn', [177]], ['plussim', [10790]], ['plustwo', [10791]], ['pm', [177]], ['Poincareplane', [8460]], ['pointint', [10773]], ['popf', [120161]], ['Popf', [8473]], ['pound', [163]], ['prap', [10935]], ['Pr', [10939]], ['pr', [8826]], ['prcue', [8828]], ['precapprox', [10935]], ['prec', [8826]], ['preccurlyeq', [8828]], ['Precedes', [8826]], ['PrecedesEqual', [10927]], ['PrecedesSlantEqual', [8828]], ['PrecedesTilde', [8830]], ['preceq', [10927]], ['precnapprox', [10937]], ['precneqq', [10933]], ['precnsim', [8936]], ['pre', [10927]], ['prE', [10931]], ['precsim', [8830]], ['prime', [8242]], ['Prime', [8243]], ['primes', [8473]], ['prnap', [10937]], ['prnE', [10933]], ['prnsim', [8936]], ['prod', [8719]], ['Product', [8719]], ['profalar', [9006]], ['profline', [8978]], ['profsurf', [8979]], ['prop', [8733]], ['Proportional', [8733]], ['Proportion', [8759]], ['propto', [8733]], ['prsim', [8830]], ['prurel', [8880]], ['Pscr', [119979]], ['pscr', [120005]], ['Psi', [936]], ['psi', [968]], ['puncsp', [8200]], ['Qfr', [120084]], ['qfr', [120110]], ['qint', [10764]], ['qopf', [120162]], ['Qopf', [8474]], ['qprime', [8279]], ['Qscr', [119980]], ['qscr', [120006]], ['quaternions', [8461]], ['quatint', [10774]], ['quest', [63]], ['questeq', [8799]], ['quot', [34]], ['QUOT', [34]], ['rAarr', [8667]], ['race', [8765, 817]], ['Racute', [340]], ['racute', [341]], ['radic', [8730]], ['raemptyv', [10675]], ['rang', [10217]], ['Rang', [10219]], ['rangd', [10642]], ['range', [10661]], ['rangle', [10217]], ['raquo', [187]], ['rarrap', [10613]], ['rarrb', [8677]], ['rarrbfs', [10528]], ['rarrc', [10547]], ['rarr', [8594]], ['Rarr', [8608]], ['rArr', [8658]], ['rarrfs', [10526]], ['rarrhk', [8618]], ['rarrlp', [8620]], ['rarrpl', [10565]], ['rarrsim', [10612]], ['Rarrtl', [10518]], ['rarrtl', [8611]], ['rarrw', [8605]], ['ratail', [10522]], ['rAtail', [10524]], ['ratio', [8758]], ['rationals', [8474]], ['rbarr', [10509]], ['rBarr', [10511]], ['RBarr', [10512]], ['rbbrk', [10099]], ['rbrace', [125]], ['rbrack', [93]], ['rbrke', [10636]], ['rbrksld', [10638]], ['rbrkslu', [10640]], ['Rcaron', [344]], ['rcaron', [345]], ['Rcedil', [342]], ['rcedil', [343]], ['rceil', [8969]], ['rcub', [125]], ['Rcy', [1056]], ['rcy', [1088]], ['rdca', [10551]], ['rdldhar', [10601]], ['rdquo', [8221]], ['rdquor', [8221]], ['CloseCurlyDoubleQuote', [8221]], ['rdsh', [8627]], ['real', [8476]], ['realine', [8475]], ['realpart', [8476]], ['reals', [8477]], ['Re', [8476]], ['rect', [9645]], ['reg', [174]], ['REG', [174]], ['ReverseElement', [8715]], ['ReverseEquilibrium', [8651]], ['ReverseUpEquilibrium', [10607]], ['rfisht', [10621]], ['rfloor', [8971]], ['rfr', [120111]], ['Rfr', [8476]], ['rHar', [10596]], ['rhard', [8641]], ['rharu', [8640]], ['rharul', [10604]], ['Rho', [929]], ['rho', [961]], ['rhov', [1009]], ['RightAngleBracket', [10217]], ['RightArrowBar', [8677]], ['rightarrow', [8594]], ['RightArrow', [8594]], ['Rightarrow', [8658]], ['RightArrowLeftArrow', [8644]], ['rightarrowtail', [8611]], ['RightCeiling', [8969]], ['RightDoubleBracket', [10215]], ['RightDownTeeVector', [10589]], ['RightDownVectorBar', [10581]], ['RightDownVector', [8642]], ['RightFloor', [8971]], ['rightharpoondown', [8641]], ['rightharpoonup', [8640]], ['rightleftarrows', [8644]], ['rightleftharpoons', [8652]], ['rightrightarrows', [8649]], ['rightsquigarrow', [8605]], ['RightTeeArrow', [8614]], ['RightTee', [8866]], ['RightTeeVector', [10587]], ['rightthreetimes', [8908]], ['RightTriangleBar', [10704]], ['RightTriangle', [8883]], ['RightTriangleEqual', [8885]], ['RightUpDownVector', [10575]], ['RightUpTeeVector', [10588]], ['RightUpVectorBar', [10580]], ['RightUpVector', [8638]], ['RightVectorBar', [10579]], ['RightVector', [8640]], ['ring', [730]], ['risingdotseq', [8787]], ['rlarr', [8644]], ['rlhar', [8652]], ['rlm', [8207]], ['rmoustache', [9137]], ['rmoust', [9137]], ['rnmid', [10990]], ['roang', [10221]], ['roarr', [8702]], ['robrk', [10215]], ['ropar', [10630]], ['ropf', [120163]], ['Ropf', [8477]], ['roplus', [10798]], ['rotimes', [10805]], ['RoundImplies', [10608]], ['rpar', [41]], ['rpargt', [10644]], ['rppolint', [10770]], ['rrarr', [8649]], ['Rrightarrow', [8667]], ['rsaquo', [8250]], ['rscr', [120007]], ['Rscr', [8475]], ['rsh', [8625]], ['Rsh', [8625]], ['rsqb', [93]], ['rsquo', [8217]], ['rsquor', [8217]], ['CloseCurlyQuote', [8217]], ['rthree', [8908]], ['rtimes', [8906]], ['rtri', [9657]], ['rtrie', [8885]], ['rtrif', [9656]], ['rtriltri', [10702]], ['RuleDelayed', [10740]], ['ruluhar', [10600]], ['rx', [8478]], ['Sacute', [346]], ['sacute', [347]], ['sbquo', [8218]], ['scap', [10936]], ['Scaron', [352]], ['scaron', [353]], ['Sc', [10940]], ['sc', [8827]], ['sccue', [8829]], ['sce', [10928]], ['scE', [10932]], ['Scedil', [350]], ['scedil', [351]], ['Scirc', [348]], ['scirc', [349]], ['scnap', [10938]], ['scnE', [10934]], ['scnsim', [8937]], ['scpolint', [10771]], ['scsim', [8831]], ['Scy', [1057]], ['scy', [1089]], ['sdotb', [8865]], ['sdot', [8901]], ['sdote', [10854]], ['searhk', [10533]], ['searr', [8600]], ['seArr', [8664]], ['searrow', [8600]], ['sect', [167]], ['semi', [59]], ['seswar', [10537]], ['setminus', [8726]], ['setmn', [8726]], ['sext', [10038]], ['Sfr', [120086]], ['sfr', [120112]], ['sfrown', [8994]], ['sharp', [9839]], ['SHCHcy', [1065]], ['shchcy', [1097]], ['SHcy', [1064]], ['shcy', [1096]], ['ShortDownArrow', [8595]], ['ShortLeftArrow', [8592]], ['shortmid', [8739]], ['shortparallel', [8741]], ['ShortRightArrow', [8594]], ['ShortUpArrow', [8593]], ['shy', [173]], ['Sigma', [931]], ['sigma', [963]], ['sigmaf', [962]], ['sigmav', [962]], ['sim', [8764]], ['simdot', [10858]], ['sime', [8771]], ['simeq', [8771]], ['simg', [10910]], ['simgE', [10912]], ['siml', [10909]], ['simlE', [10911]], ['simne', [8774]], ['simplus', [10788]], ['simrarr', [10610]], ['slarr', [8592]], ['SmallCircle', [8728]], ['smallsetminus', [8726]], ['smashp', [10803]], ['smeparsl', [10724]], ['smid', [8739]], ['smile', [8995]], ['smt', [10922]], ['smte', [10924]], ['smtes', [10924, 65024]], ['SOFTcy', [1068]], ['softcy', [1100]], ['solbar', [9023]], ['solb', [10692]], ['sol', [47]], ['Sopf', [120138]], ['sopf', [120164]], ['spades', [9824]], ['spadesuit', [9824]], ['spar', [8741]], ['sqcap', [8851]], ['sqcaps', [8851, 65024]], ['sqcup', [8852]], ['sqcups', [8852, 65024]], ['Sqrt', [8730]], ['sqsub', [8847]], ['sqsube', [8849]], ['sqsubset', [8847]], ['sqsubseteq', [8849]], ['sqsup', [8848]], ['sqsupe', [8850]], ['sqsupset', [8848]], ['sqsupseteq', [8850]], ['square', [9633]], ['Square', [9633]], ['SquareIntersection', [8851]], ['SquareSubset', [8847]], ['SquareSubsetEqual', [8849]], ['SquareSuperset', [8848]], ['SquareSupersetEqual', [8850]], ['SquareUnion', [8852]], ['squarf', [9642]], ['squ', [9633]], ['squf', [9642]], ['srarr', [8594]], ['Sscr', [119982]], ['sscr', [120008]], ['ssetmn', [8726]], ['ssmile', [8995]], ['sstarf', [8902]], ['Star', [8902]], ['star', [9734]], ['starf', [9733]], ['straightepsilon', [1013]], ['straightphi', [981]], ['strns', [175]], ['sub', [8834]], ['Sub', [8912]], ['subdot', [10941]], ['subE', [10949]], ['sube', [8838]], ['subedot', [10947]], ['submult', [10945]], ['subnE', [10955]], ['subne', [8842]], ['subplus', [10943]], ['subrarr', [10617]], ['subset', [8834]], ['Subset', [8912]], ['subseteq', [8838]], ['subseteqq', [10949]], ['SubsetEqual', [8838]], ['subsetneq', [8842]], ['subsetneqq', [10955]], ['subsim', [10951]], ['subsub', [10965]], ['subsup', [10963]], ['succapprox', [10936]], ['succ', [8827]], ['succcurlyeq', [8829]], ['Succeeds', [8827]], ['SucceedsEqual', [10928]], ['SucceedsSlantEqual', [8829]], ['SucceedsTilde', [8831]], ['succeq', [10928]], ['succnapprox', [10938]], ['succneqq', [10934]], ['succnsim', [8937]], ['succsim', [8831]], ['SuchThat', [8715]], ['sum', [8721]], ['Sum', [8721]], ['sung', [9834]], ['sup1', [185]], ['sup2', [178]], ['sup3', [179]], ['sup', [8835]], ['Sup', [8913]], ['supdot', [10942]], ['supdsub', [10968]], ['supE', [10950]], ['supe', [8839]], ['supedot', [10948]], ['Superset', [8835]], ['SupersetEqual', [8839]], ['suphsol', [10185]], ['suphsub', [10967]], ['suplarr', [10619]], ['supmult', [10946]], ['supnE', [10956]], ['supne', [8843]], ['supplus', [10944]], ['supset', [8835]], ['Supset', [8913]], ['supseteq', [8839]], ['supseteqq', [10950]], ['supsetneq', [8843]], ['supsetneqq', [10956]], ['supsim', [10952]], ['supsub', [10964]], ['supsup', [10966]], ['swarhk', [10534]], ['swarr', [8601]], ['swArr', [8665]], ['swarrow', [8601]], ['swnwar', [10538]], ['szlig', [223]], ['Tab', [9]], ['target', [8982]], ['Tau', [932]], ['tau', [964]], ['tbrk', [9140]], ['Tcaron', [356]], ['tcaron', [357]], ['Tcedil', [354]], ['tcedil', [355]], ['Tcy', [1058]], ['tcy', [1090]], ['tdot', [8411]], ['telrec', [8981]], ['Tfr', [120087]], ['tfr', [120113]], ['there4', [8756]], ['therefore', [8756]], ['Therefore', [8756]], ['Theta', [920]], ['theta', [952]], ['thetasym', [977]], ['thetav', [977]], ['thickapprox', [8776]], ['thicksim', [8764]], ['ThickSpace', [8287, 8202]], ['ThinSpace', [8201]], ['thinsp', [8201]], ['thkap', [8776]], ['thksim', [8764]], ['THORN', [222]], ['thorn', [254]], ['tilde', [732]], ['Tilde', [8764]], ['TildeEqual', [8771]], ['TildeFullEqual', [8773]], ['TildeTilde', [8776]], ['timesbar', [10801]], ['timesb', [8864]], ['times', [215]], ['timesd', [10800]], ['tint', [8749]], ['toea', [10536]], ['topbot', [9014]], ['topcir', [10993]], ['top', [8868]], ['Topf', [120139]], ['topf', [120165]], ['topfork', [10970]], ['tosa', [10537]], ['tprime', [8244]], ['trade', [8482]], ['TRADE', [8482]], ['triangle', [9653]], ['triangledown', [9663]], ['triangleleft', [9667]], ['trianglelefteq', [8884]], ['triangleq', [8796]], ['triangleright', [9657]], ['trianglerighteq', [8885]], ['tridot', [9708]], ['trie', [8796]], ['triminus', [10810]], ['TripleDot', [8411]], ['triplus', [10809]], ['trisb', [10701]], ['tritime', [10811]], ['trpezium', [9186]], ['Tscr', [119983]], ['tscr', [120009]], ['TScy', [1062]], ['tscy', [1094]], ['TSHcy', [1035]], ['tshcy', [1115]], ['Tstrok', [358]], ['tstrok', [359]], ['twixt', [8812]], ['twoheadleftarrow', [8606]], ['twoheadrightarrow', [8608]], ['Uacute', [218]], ['uacute', [250]], ['uarr', [8593]], ['Uarr', [8607]], ['uArr', [8657]], ['Uarrocir', [10569]], ['Ubrcy', [1038]], ['ubrcy', [1118]], ['Ubreve', [364]], ['ubreve', [365]], ['Ucirc', [219]], ['ucirc', [251]], ['Ucy', [1059]], ['ucy', [1091]], ['udarr', [8645]], ['Udblac', [368]], ['udblac', [369]], ['udhar', [10606]], ['ufisht', [10622]], ['Ufr', [120088]], ['ufr', [120114]], ['Ugrave', [217]], ['ugrave', [249]], ['uHar', [10595]], ['uharl', [8639]], ['uharr', [8638]], ['uhblk', [9600]], ['ulcorn', [8988]], ['ulcorner', [8988]], ['ulcrop', [8975]], ['ultri', [9720]], ['Umacr', [362]], ['umacr', [363]], ['uml', [168]], ['UnderBar', [95]], ['UnderBrace', [9183]], ['UnderBracket', [9141]], ['UnderParenthesis', [9181]], ['Union', [8899]], ['UnionPlus', [8846]], ['Uogon', [370]], ['uogon', [371]], ['Uopf', [120140]], ['uopf', [120166]], ['UpArrowBar', [10514]], ['uparrow', [8593]], ['UpArrow', [8593]], ['Uparrow', [8657]], ['UpArrowDownArrow', [8645]], ['updownarrow', [8597]], ['UpDownArrow', [8597]], ['Updownarrow', [8661]], ['UpEquilibrium', [10606]], ['upharpoonleft', [8639]], ['upharpoonright', [8638]], ['uplus', [8846]], ['UpperLeftArrow', [8598]], ['UpperRightArrow', [8599]], ['upsi', [965]], ['Upsi', [978]], ['upsih', [978]], ['Upsilon', [933]], ['upsilon', [965]], ['UpTeeArrow', [8613]], ['UpTee', [8869]], ['upuparrows', [8648]], ['urcorn', [8989]], ['urcorner', [8989]], ['urcrop', [8974]], ['Uring', [366]], ['uring', [367]], ['urtri', [9721]], ['Uscr', [119984]], ['uscr', [120010]], ['utdot', [8944]], ['Utilde', [360]], ['utilde', [361]], ['utri', [9653]], ['utrif', [9652]], ['uuarr', [8648]], ['Uuml', [220]], ['uuml', [252]], ['uwangle', [10663]], ['vangrt', [10652]], ['varepsilon', [1013]], ['varkappa', [1008]], ['varnothing', [8709]], ['varphi', [981]], ['varpi', [982]], ['varpropto', [8733]], ['varr', [8597]], ['vArr', [8661]], ['varrho', [1009]], ['varsigma', [962]], ['varsubsetneq', [8842, 65024]], ['varsubsetneqq', [10955, 65024]], ['varsupsetneq', [8843, 65024]], ['varsupsetneqq', [10956, 65024]], ['vartheta', [977]], ['vartriangleleft', [8882]], ['vartriangleright', [8883]], ['vBar', [10984]], ['Vbar', [10987]], ['vBarv', [10985]], ['Vcy', [1042]], ['vcy', [1074]], ['vdash', [8866]], ['vDash', [8872]], ['Vdash', [8873]], ['VDash', [8875]], ['Vdashl', [10982]], ['veebar', [8891]], ['vee', [8744]], ['Vee', [8897]], ['veeeq', [8794]], ['vellip', [8942]], ['verbar', [124]], ['Verbar', [8214]], ['vert', [124]], ['Vert', [8214]], ['VerticalBar', [8739]], ['VerticalLine', [124]], ['VerticalSeparator', [10072]], ['VerticalTilde', [8768]], ['VeryThinSpace', [8202]], ['Vfr', [120089]], ['vfr', [120115]], ['vltri', [8882]], ['vnsub', [8834, 8402]], ['vnsup', [8835, 8402]], ['Vopf', [120141]], ['vopf', [120167]], ['vprop', [8733]], ['vrtri', [8883]], ['Vscr', [119985]], ['vscr', [120011]], ['vsubnE', [10955, 65024]], ['vsubne', [8842, 65024]], ['vsupnE', [10956, 65024]], ['vsupne', [8843, 65024]], ['Vvdash', [8874]], ['vzigzag', [10650]], ['Wcirc', [372]], ['wcirc', [373]], ['wedbar', [10847]], ['wedge', [8743]], ['Wedge', [8896]], ['wedgeq', [8793]], ['weierp', [8472]], ['Wfr', [120090]], ['wfr', [120116]], ['Wopf', [120142]], ['wopf', [120168]], ['wp', [8472]], ['wr', [8768]], ['wreath', [8768]], ['Wscr', [119986]], ['wscr', [120012]], ['xcap', [8898]], ['xcirc', [9711]], ['xcup', [8899]], ['xdtri', [9661]], ['Xfr', [120091]], ['xfr', [120117]], ['xharr', [10231]], ['xhArr', [10234]], ['Xi', [926]], ['xi', [958]], ['xlarr', [10229]], ['xlArr', [10232]], ['xmap', [10236]], ['xnis', [8955]], ['xodot', [10752]], ['Xopf', [120143]], ['xopf', [120169]], ['xoplus', [10753]], ['xotime', [10754]], ['xrarr', [10230]], ['xrArr', [10233]], ['Xscr', [119987]], ['xscr', [120013]], ['xsqcup', [10758]], ['xuplus', [10756]], ['xutri', [9651]], ['xvee', [8897]], ['xwedge', [8896]], ['Yacute', [221]], ['yacute', [253]], ['YAcy', [1071]], ['yacy', [1103]], ['Ycirc', [374]], ['ycirc', [375]], ['Ycy', [1067]], ['ycy', [1099]], ['yen', [165]], ['Yfr', [120092]], ['yfr', [120118]], ['YIcy', [1031]], ['yicy', [1111]], ['Yopf', [120144]], ['yopf', [120170]], ['Yscr', [119988]], ['yscr', [120014]], ['YUcy', [1070]], ['yucy', [1102]], ['yuml', [255]], ['Yuml', [376]], ['Zacute', [377]], ['zacute', [378]], ['Zcaron', [381]], ['zcaron', [382]], ['Zcy', [1047]], ['zcy', [1079]], ['Zdot', [379]], ['zdot', [380]], ['zeetrf', [8488]], ['ZeroWidthSpace', [8203]], ['Zeta', [918]], ['zeta', [950]], ['zfr', [120119]], ['Zfr', [8488]], ['ZHcy', [1046]], ['zhcy', [1078]], ['zigrarr', [8669]], ['zopf', [120171]], ['Zopf', [8484]], ['Zscr', [119989]], ['zscr', [120015]], ['zwj', [8205]], ['zwnj', [8204]]];\n\nvar alphaIndex = {};\nvar charIndex = {};\n\ncreateIndexes(alphaIndex, charIndex);\n\n/**\n * @constructor\n */\nfunction Html5Entities() {}\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.decode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/&(#?[\\w\\d]+);?/g, function(s, entity) {\n        var chr;\n        if (entity.charAt(0) === \"#\") {\n            var code = entity.charAt(1) === 'x' ?\n                parseInt(entity.substr(2).toLowerCase(), 16) :\n                parseInt(entity.substr(1));\n\n            if (!(isNaN(code) || code < -32768 || code > 65535)) {\n                chr = String.fromCharCode(code);\n            }\n        } else {\n            chr = alphaIndex[entity];\n        }\n        return chr || s;\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.decode = function(str) {\n    return new Html5Entities().decode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.encode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var charInfo = charIndex[str.charCodeAt(i)];\n        if (charInfo) {\n            var alpha = charInfo[str.charCodeAt(i + 1)];\n            if (alpha) {\n                i++;\n            } else {\n                alpha = charInfo[''];\n            }\n            if (alpha) {\n                result += \"&\" + alpha + \";\";\n                i++;\n                continue;\n            }\n        }\n        result += str.charAt(i);\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.encode = function(str) {\n    return new Html5Entities().encode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.encodeNonUTF = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        var charInfo = charIndex[c];\n        if (charInfo) {\n            var alpha = charInfo[str.charCodeAt(i + 1)];\n            if (alpha) {\n                i++;\n            } else {\n                alpha = charInfo[''];\n            }\n            if (alpha) {\n                result += \"&\" + alpha + \";\";\n                i++;\n                continue;\n            }\n        }\n        if (c < 32 || c > 126) {\n            result += '&#' + c + ';';\n        } else {\n            result += str.charAt(i);\n        }\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.encodeNonUTF = function(str) {\n    return new Html5Entities().encodeNonUTF(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nHtml5Entities.prototype.encodeNonASCII = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        if (c <= 255) {\n            result += str[i++];\n            continue;\n        }\n        result += '&#' + c + ';';\n        i++\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n Html5Entities.encodeNonASCII = function(str) {\n    return new Html5Entities().encodeNonASCII(str);\n };\n\n/**\n * @param {Object} alphaIndex Passed by reference.\n * @param {Object} charIndex Passed by reference.\n */\nfunction createIndexes(alphaIndex, charIndex) {\n    var i = ENTITIES.length;\n    var _results = [];\n    while (i--) {\n        var e = ENTITIES[i];\n        var alpha = e[0];\n        var chars = e[1];\n        var chr = chars[0];\n        var addChar = (chr < 32 || chr > 126) || chr === 62 || chr === 60 || chr === 38 || chr === 34 || chr === 39;\n        var charInfo;\n        if (addChar) {\n            charInfo = charIndex[chr] = charIndex[chr] || {};\n        }\n        if (chars[1]) {\n            var chr2 = chars[1];\n            alphaIndex[alpha] = String.fromCharCode(chr) + String.fromCharCode(chr2);\n            _results.push(addChar && (charInfo[chr2] = alpha));\n        } else {\n            alphaIndex[alpha] = String.fromCharCode(chr);\n            _results.push(addChar && (charInfo[''] = alpha));\n        }\n    }\n}\n\nmodule.exports = Html5Entities;\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/lib/html5-entities.js?");

/***/ }),

/***/ "./node_modules/html-entities/lib/xml-entities.js":
/*!********************************************************!*\
  !*** ./node_modules/html-entities/lib/xml-entities.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var ALPHA_INDEX = {\n    '&lt': '<',\n    '&gt': '>',\n    '&quot': '\"',\n    '&apos': '\\'',\n    '&amp': '&',\n    '&lt;': '<',\n    '&gt;': '>',\n    '&quot;': '\"',\n    '&apos;': '\\'',\n    '&amp;': '&'\n};\n\nvar CHAR_INDEX = {\n    60: 'lt',\n    62: 'gt',\n    34: 'quot',\n    39: 'apos',\n    38: 'amp'\n};\n\nvar CHAR_S_INDEX = {\n    '<': '&lt;',\n    '>': '&gt;',\n    '\"': '&quot;',\n    '\\'': '&apos;',\n    '&': '&amp;'\n};\n\n/**\n * @constructor\n */\nfunction XmlEntities() {}\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.encode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/<|>|\"|'|&/g, function(s) {\n        return CHAR_S_INDEX[s];\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.encode = function(str) {\n    return new XmlEntities().encode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.decode = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    return str.replace(/&#?[0-9a-zA-Z]+;?/g, function(s) {\n        if (s.charAt(1) === '#') {\n            var code = s.charAt(2).toLowerCase() === 'x' ?\n                parseInt(s.substr(3), 16) :\n                parseInt(s.substr(2));\n\n            if (isNaN(code) || code < -32768 || code > 65535) {\n                return '';\n            }\n            return String.fromCharCode(code);\n        }\n        return ALPHA_INDEX[s] || s;\n    });\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.decode = function(str) {\n    return new XmlEntities().decode(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.encodeNonUTF = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLength = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLength) {\n        var c = str.charCodeAt(i);\n        var alpha = CHAR_INDEX[c];\n        if (alpha) {\n            result += \"&\" + alpha + \";\";\n            i++;\n            continue;\n        }\n        if (c < 32 || c > 126) {\n            result += '&#' + c + ';';\n        } else {\n            result += str.charAt(i);\n        }\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.encodeNonUTF = function(str) {\n    return new XmlEntities().encodeNonUTF(str);\n };\n\n/**\n * @param {String} str\n * @returns {String}\n */\nXmlEntities.prototype.encodeNonASCII = function(str) {\n    if (!str || !str.length) {\n        return '';\n    }\n    var strLenght = str.length;\n    var result = '';\n    var i = 0;\n    while (i < strLenght) {\n        var c = str.charCodeAt(i);\n        if (c <= 255) {\n            result += str[i++];\n            continue;\n        }\n        result += '&#' + c + ';';\n        i++;\n    }\n    return result;\n};\n\n/**\n * @param {String} str\n * @returns {String}\n */\n XmlEntities.encodeNonASCII = function(str) {\n    return new XmlEntities().encodeNonASCII(str);\n };\n\nmodule.exports = XmlEntities;\n\n\n//# sourceURL=webpack:///./node_modules/html-entities/lib/xml-entities.js?");

/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar toString = Object.prototype.toString;\n\nmodule.exports = function (x) {\n\tvar prototype;\n\treturn toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));\n};\n\n\n//# sourceURL=webpack:///./node_modules/is-plain-obj/index.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    now = __webpack_require__(/*! ./now */ \"./node_modules/lodash/now.js\"),\n    toNumber = __webpack_require__(/*! ./toNumber */ \"./node_modules/lodash/toNumber.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max,\n    nativeMin = Math.min;\n\n/**\n * Creates a debounced function that delays invoking `func` until after `wait`\n * milliseconds have elapsed since the last time the debounced function was\n * invoked. The debounced function comes with a `cancel` method to cancel\n * delayed `func` invocations and a `flush` method to immediately invoke them.\n * Provide `options` to indicate whether `func` should be invoked on the\n * leading and/or trailing edge of the `wait` timeout. The `func` is invoked\n * with the last arguments provided to the debounced function. Subsequent\n * calls to the debounced function return the result of the last `func`\n * invocation.\n *\n * **Note:** If `leading` and `trailing` options are `true`, `func` is\n * invoked on the trailing edge of the timeout only if the debounced function\n * is invoked more than once during the `wait` timeout.\n *\n * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred\n * until to the next tick, similar to `setTimeout` with a timeout of `0`.\n *\n * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)\n * for details over the differences between `_.debounce` and `_.throttle`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to debounce.\n * @param {number} [wait=0] The number of milliseconds to delay.\n * @param {Object} [options={}] The options object.\n * @param {boolean} [options.leading=false]\n *  Specify invoking on the leading edge of the timeout.\n * @param {number} [options.maxWait]\n *  The maximum time `func` is allowed to be delayed before it's invoked.\n * @param {boolean} [options.trailing=true]\n *  Specify invoking on the trailing edge of the timeout.\n * @returns {Function} Returns the new debounced function.\n * @example\n *\n * // Avoid costly calculations while the window size is in flux.\n * jQuery(window).on('resize', _.debounce(calculateLayout, 150));\n *\n * // Invoke `sendMail` when clicked, debouncing subsequent calls.\n * jQuery(element).on('click', _.debounce(sendMail, 300, {\n *   'leading': true,\n *   'trailing': false\n * }));\n *\n * // Ensure `batchLog` is invoked once after 1 second of debounced calls.\n * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });\n * var source = new EventSource('/stream');\n * jQuery(source).on('message', debounced);\n *\n * // Cancel the trailing debounced invocation.\n * jQuery(window).on('popstate', debounced.cancel);\n */\nfunction debounce(func, wait, options) {\n  var lastArgs,\n      lastThis,\n      maxWait,\n      result,\n      timerId,\n      lastCallTime,\n      lastInvokeTime = 0,\n      leading = false,\n      maxing = false,\n      trailing = true;\n\n  if (typeof func != 'function') {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  wait = toNumber(wait) || 0;\n  if (isObject(options)) {\n    leading = !!options.leading;\n    maxing = 'maxWait' in options;\n    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;\n    trailing = 'trailing' in options ? !!options.trailing : trailing;\n  }\n\n  function invokeFunc(time) {\n    var args = lastArgs,\n        thisArg = lastThis;\n\n    lastArgs = lastThis = undefined;\n    lastInvokeTime = time;\n    result = func.apply(thisArg, args);\n    return result;\n  }\n\n  function leadingEdge(time) {\n    // Reset any `maxWait` timer.\n    lastInvokeTime = time;\n    // Start the timer for the trailing edge.\n    timerId = setTimeout(timerExpired, wait);\n    // Invoke the leading edge.\n    return leading ? invokeFunc(time) : result;\n  }\n\n  function remainingWait(time) {\n    var timeSinceLastCall = time - lastCallTime,\n        timeSinceLastInvoke = time - lastInvokeTime,\n        timeWaiting = wait - timeSinceLastCall;\n\n    return maxing\n      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)\n      : timeWaiting;\n  }\n\n  function shouldInvoke(time) {\n    var timeSinceLastCall = time - lastCallTime,\n        timeSinceLastInvoke = time - lastInvokeTime;\n\n    // Either this is the first call, activity has stopped and we're at the\n    // trailing edge, the system time has gone backwards and we're treating\n    // it as the trailing edge, or we've hit the `maxWait` limit.\n    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||\n      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));\n  }\n\n  function timerExpired() {\n    var time = now();\n    if (shouldInvoke(time)) {\n      return trailingEdge(time);\n    }\n    // Restart the timer.\n    timerId = setTimeout(timerExpired, remainingWait(time));\n  }\n\n  function trailingEdge(time) {\n    timerId = undefined;\n\n    // Only invoke if we have `lastArgs` which means `func` has been\n    // debounced at least once.\n    if (trailing && lastArgs) {\n      return invokeFunc(time);\n    }\n    lastArgs = lastThis = undefined;\n    return result;\n  }\n\n  function cancel() {\n    if (timerId !== undefined) {\n      clearTimeout(timerId);\n    }\n    lastInvokeTime = 0;\n    lastArgs = lastCallTime = lastThis = timerId = undefined;\n  }\n\n  function flush() {\n    return timerId === undefined ? result : trailingEdge(now());\n  }\n\n  function debounced() {\n    var time = now(),\n        isInvoking = shouldInvoke(time);\n\n    lastArgs = arguments;\n    lastThis = this;\n    lastCallTime = time;\n\n    if (isInvoking) {\n      if (timerId === undefined) {\n        return leadingEdge(lastCallTime);\n      }\n      if (maxing) {\n        // Handle invocations in a tight loop.\n        timerId = setTimeout(timerExpired, wait);\n        return invokeFunc(lastCallTime);\n      }\n    }\n    if (timerId === undefined) {\n      timerId = setTimeout(timerExpired, wait);\n    }\n    return result;\n  }\n  debounced.cancel = cancel;\n  debounced.flush = flush;\n  return debounced;\n}\n\nmodule.exports = debounce;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/debounce.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/**\n * Gets the timestamp of the number of milliseconds that have elapsed since\n * the Unix epoch (1 January 1970 00:00:00 UTC).\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Date\n * @returns {number} Returns the timestamp.\n * @example\n *\n * _.defer(function(stamp) {\n *   console.log(_.now() - stamp);\n * }, _.now());\n * // => Logs the number of milliseconds it took for the deferred invocation.\n */\nvar now = function() {\n  return root.Date.now();\n};\n\nmodule.exports = now;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/now.js?");

/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar NAN = 0 / 0;\n\n/** Used to match leading and trailing whitespace. */\nvar reTrim = /^\\s+|\\s+$/g;\n\n/** Used to detect bad signed hexadecimal string values. */\nvar reIsBadHex = /^[-+]0x[0-9a-f]+$/i;\n\n/** Used to detect binary string values. */\nvar reIsBinary = /^0b[01]+$/i;\n\n/** Used to detect octal string values. */\nvar reIsOctal = /^0o[0-7]+$/i;\n\n/** Built-in method references without a dependency on `root`. */\nvar freeParseInt = parseInt;\n\n/**\n * Converts `value` to a number.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to process.\n * @returns {number} Returns the number.\n * @example\n *\n * _.toNumber(3.2);\n * // => 3.2\n *\n * _.toNumber(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toNumber(Infinity);\n * // => Infinity\n *\n * _.toNumber('3.2');\n * // => 3.2\n */\nfunction toNumber(value) {\n  if (typeof value == 'number') {\n    return value;\n  }\n  if (isSymbol(value)) {\n    return NAN;\n  }\n  if (isObject(value)) {\n    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;\n    value = isObject(other) ? (other + '') : other;\n  }\n  if (typeof value != 'string') {\n    return value === 0 ? value : +value;\n  }\n  value = value.replace(reTrim, '');\n  var isBinary = reIsBinary.test(value);\n  return (isBinary || reIsOctal.test(value))\n    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)\n    : (reIsBadHex.test(value) ? NAN : +value);\n}\n\nmodule.exports = toNumber;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/toNumber.js?");

/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/punycode/punycode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/punycode/punycode.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */\n;(function(root) {\n\n\t/** Detect free variables */\n\tvar freeExports = typeof exports == 'object' && exports &&\n\t\t!exports.nodeType && exports;\n\tvar freeModule = typeof module == 'object' && module &&\n\t\t!module.nodeType && module;\n\tvar freeGlobal = typeof global == 'object' && global;\n\tif (\n\t\tfreeGlobal.global === freeGlobal ||\n\t\tfreeGlobal.window === freeGlobal ||\n\t\tfreeGlobal.self === freeGlobal\n\t) {\n\t\troot = freeGlobal;\n\t}\n\n\t/**\n\t * The `punycode` object.\n\t * @name punycode\n\t * @type Object\n\t */\n\tvar punycode,\n\n\t/** Highest positive signed 32-bit float value */\n\tmaxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1\n\n\t/** Bootstring parameters */\n\tbase = 36,\n\ttMin = 1,\n\ttMax = 26,\n\tskew = 38,\n\tdamp = 700,\n\tinitialBias = 72,\n\tinitialN = 128, // 0x80\n\tdelimiter = '-', // '\\x2D'\n\n\t/** Regular expressions */\n\tregexPunycode = /^xn--/,\n\tregexNonASCII = /[^\\x20-\\x7E]/, // unprintable ASCII chars + non-ASCII chars\n\tregexSeparators = /[\\x2E\\u3002\\uFF0E\\uFF61]/g, // RFC 3490 separators\n\n\t/** Error messages */\n\terrors = {\n\t\t'overflow': 'Overflow: input needs wider integers to process',\n\t\t'not-basic': 'Illegal input >= 0x80 (not a basic code point)',\n\t\t'invalid-input': 'Invalid input'\n\t},\n\n\t/** Convenience shortcuts */\n\tbaseMinusTMin = base - tMin,\n\tfloor = Math.floor,\n\tstringFromCharCode = String.fromCharCode,\n\n\t/** Temporary variable */\n\tkey;\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/**\n\t * A generic error utility function.\n\t * @private\n\t * @param {String} type The error type.\n\t * @returns {Error} Throws a `RangeError` with the applicable error message.\n\t */\n\tfunction error(type) {\n\t\tthrow new RangeError(errors[type]);\n\t}\n\n\t/**\n\t * A generic `Array#map` utility function.\n\t * @private\n\t * @param {Array} array The array to iterate over.\n\t * @param {Function} callback The function that gets called for every array\n\t * item.\n\t * @returns {Array} A new array of values returned by the callback function.\n\t */\n\tfunction map(array, fn) {\n\t\tvar length = array.length;\n\t\tvar result = [];\n\t\twhile (length--) {\n\t\t\tresult[length] = fn(array[length]);\n\t\t}\n\t\treturn result;\n\t}\n\n\t/**\n\t * A simple `Array#map`-like wrapper to work with domain name strings or email\n\t * addresses.\n\t * @private\n\t * @param {String} domain The domain name or email address.\n\t * @param {Function} callback The function that gets called for every\n\t * character.\n\t * @returns {Array} A new string of characters returned by the callback\n\t * function.\n\t */\n\tfunction mapDomain(string, fn) {\n\t\tvar parts = string.split('@');\n\t\tvar result = '';\n\t\tif (parts.length > 1) {\n\t\t\t// In email addresses, only the domain name should be punycoded. Leave\n\t\t\t// the local part (i.e. everything up to `@`) intact.\n\t\t\tresult = parts[0] + '@';\n\t\t\tstring = parts[1];\n\t\t}\n\t\t// Avoid `split(regex)` for IE8 compatibility. See #17.\n\t\tstring = string.replace(regexSeparators, '\\x2E');\n\t\tvar labels = string.split('.');\n\t\tvar encoded = map(labels, fn).join('.');\n\t\treturn result + encoded;\n\t}\n\n\t/**\n\t * Creates an array containing the numeric code points of each Unicode\n\t * character in the string. While JavaScript uses UCS-2 internally,\n\t * this function will convert a pair of surrogate halves (each of which\n\t * UCS-2 exposes as separate characters) into a single code point,\n\t * matching UTF-16.\n\t * @see `punycode.ucs2.encode`\n\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t * @memberOf punycode.ucs2\n\t * @name decode\n\t * @param {String} string The Unicode input string (UCS-2).\n\t * @returns {Array} The new array of code points.\n\t */\n\tfunction ucs2decode(string) {\n\t\tvar output = [],\n\t\t    counter = 0,\n\t\t    length = string.length,\n\t\t    value,\n\t\t    extra;\n\t\twhile (counter < length) {\n\t\t\tvalue = string.charCodeAt(counter++);\n\t\t\tif (value >= 0xD800 && value <= 0xDBFF && counter < length) {\n\t\t\t\t// high surrogate, and there is a next character\n\t\t\t\textra = string.charCodeAt(counter++);\n\t\t\t\tif ((extra & 0xFC00) == 0xDC00) { // low surrogate\n\t\t\t\t\toutput.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);\n\t\t\t\t} else {\n\t\t\t\t\t// unmatched surrogate; only append this code unit, in case the next\n\t\t\t\t\t// code unit is the high surrogate of a surrogate pair\n\t\t\t\t\toutput.push(value);\n\t\t\t\t\tcounter--;\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\toutput.push(value);\n\t\t\t}\n\t\t}\n\t\treturn output;\n\t}\n\n\t/**\n\t * Creates a string based on an array of numeric code points.\n\t * @see `punycode.ucs2.decode`\n\t * @memberOf punycode.ucs2\n\t * @name encode\n\t * @param {Array} codePoints The array of numeric code points.\n\t * @returns {String} The new Unicode string (UCS-2).\n\t */\n\tfunction ucs2encode(array) {\n\t\treturn map(array, function(value) {\n\t\t\tvar output = '';\n\t\t\tif (value > 0xFFFF) {\n\t\t\t\tvalue -= 0x10000;\n\t\t\t\toutput += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);\n\t\t\t\tvalue = 0xDC00 | value & 0x3FF;\n\t\t\t}\n\t\t\toutput += stringFromCharCode(value);\n\t\t\treturn output;\n\t\t}).join('');\n\t}\n\n\t/**\n\t * Converts a basic code point into a digit/integer.\n\t * @see `digitToBasic()`\n\t * @private\n\t * @param {Number} codePoint The basic numeric code point value.\n\t * @returns {Number} The numeric value of a basic code point (for use in\n\t * representing integers) in the range `0` to `base - 1`, or `base` if\n\t * the code point does not represent a value.\n\t */\n\tfunction basicToDigit(codePoint) {\n\t\tif (codePoint - 48 < 10) {\n\t\t\treturn codePoint - 22;\n\t\t}\n\t\tif (codePoint - 65 < 26) {\n\t\t\treturn codePoint - 65;\n\t\t}\n\t\tif (codePoint - 97 < 26) {\n\t\t\treturn codePoint - 97;\n\t\t}\n\t\treturn base;\n\t}\n\n\t/**\n\t * Converts a digit/integer into a basic code point.\n\t * @see `basicToDigit()`\n\t * @private\n\t * @param {Number} digit The numeric value of a basic code point.\n\t * @returns {Number} The basic code point whose value (when used for\n\t * representing integers) is `digit`, which needs to be in the range\n\t * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is\n\t * used; else, the lowercase form is used. The behavior is undefined\n\t * if `flag` is non-zero and `digit` has no uppercase form.\n\t */\n\tfunction digitToBasic(digit, flag) {\n\t\t//  0..25 map to ASCII a..z or A..Z\n\t\t// 26..35 map to ASCII 0..9\n\t\treturn digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);\n\t}\n\n\t/**\n\t * Bias adaptation function as per section 3.4 of RFC 3492.\n\t * https://tools.ietf.org/html/rfc3492#section-3.4\n\t * @private\n\t */\n\tfunction adapt(delta, numPoints, firstTime) {\n\t\tvar k = 0;\n\t\tdelta = firstTime ? floor(delta / damp) : delta >> 1;\n\t\tdelta += floor(delta / numPoints);\n\t\tfor (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {\n\t\t\tdelta = floor(delta / baseMinusTMin);\n\t\t}\n\t\treturn floor(k + (baseMinusTMin + 1) * delta / (delta + skew));\n\t}\n\n\t/**\n\t * Converts a Punycode string of ASCII-only symbols to a string of Unicode\n\t * symbols.\n\t * @memberOf punycode\n\t * @param {String} input The Punycode string of ASCII-only symbols.\n\t * @returns {String} The resulting string of Unicode symbols.\n\t */\n\tfunction decode(input) {\n\t\t// Don't use UCS-2\n\t\tvar output = [],\n\t\t    inputLength = input.length,\n\t\t    out,\n\t\t    i = 0,\n\t\t    n = initialN,\n\t\t    bias = initialBias,\n\t\t    basic,\n\t\t    j,\n\t\t    index,\n\t\t    oldi,\n\t\t    w,\n\t\t    k,\n\t\t    digit,\n\t\t    t,\n\t\t    /** Cached calculation results */\n\t\t    baseMinusT;\n\n\t\t// Handle the basic code points: let `basic` be the number of input code\n\t\t// points before the last delimiter, or `0` if there is none, then copy\n\t\t// the first basic code points to the output.\n\n\t\tbasic = input.lastIndexOf(delimiter);\n\t\tif (basic < 0) {\n\t\t\tbasic = 0;\n\t\t}\n\n\t\tfor (j = 0; j < basic; ++j) {\n\t\t\t// if it's not a basic code point\n\t\t\tif (input.charCodeAt(j) >= 0x80) {\n\t\t\t\terror('not-basic');\n\t\t\t}\n\t\t\toutput.push(input.charCodeAt(j));\n\t\t}\n\n\t\t// Main decoding loop: start just after the last delimiter if any basic code\n\t\t// points were copied; start at the beginning otherwise.\n\n\t\tfor (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {\n\n\t\t\t// `index` is the index of the next character to be consumed.\n\t\t\t// Decode a generalized variable-length integer into `delta`,\n\t\t\t// which gets added to `i`. The overflow checking is easier\n\t\t\t// if we increase `i` as we go, then subtract off its starting\n\t\t\t// value at the end to obtain `delta`.\n\t\t\tfor (oldi = i, w = 1, k = base; /* no condition */; k += base) {\n\n\t\t\t\tif (index >= inputLength) {\n\t\t\t\t\terror('invalid-input');\n\t\t\t\t}\n\n\t\t\t\tdigit = basicToDigit(input.charCodeAt(index++));\n\n\t\t\t\tif (digit >= base || digit > floor((maxInt - i) / w)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\ti += digit * w;\n\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\n\t\t\t\tif (digit < t) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\n\t\t\t\tbaseMinusT = base - t;\n\t\t\t\tif (w > floor(maxInt / baseMinusT)) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tw *= baseMinusT;\n\n\t\t\t}\n\n\t\t\tout = output.length + 1;\n\t\t\tbias = adapt(i - oldi, out, oldi == 0);\n\n\t\t\t// `i` was supposed to wrap around from `out` to `0`,\n\t\t\t// incrementing `n` each time, so we'll fix that now:\n\t\t\tif (floor(i / out) > maxInt - n) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tn += floor(i / out);\n\t\t\ti %= out;\n\n\t\t\t// Insert `n` at position `i` of the output\n\t\t\toutput.splice(i++, 0, n);\n\n\t\t}\n\n\t\treturn ucs2encode(output);\n\t}\n\n\t/**\n\t * Converts a string of Unicode symbols (e.g. a domain name label) to a\n\t * Punycode string of ASCII-only symbols.\n\t * @memberOf punycode\n\t * @param {String} input The string of Unicode symbols.\n\t * @returns {String} The resulting Punycode string of ASCII-only symbols.\n\t */\n\tfunction encode(input) {\n\t\tvar n,\n\t\t    delta,\n\t\t    handledCPCount,\n\t\t    basicLength,\n\t\t    bias,\n\t\t    j,\n\t\t    m,\n\t\t    q,\n\t\t    k,\n\t\t    t,\n\t\t    currentValue,\n\t\t    output = [],\n\t\t    /** `inputLength` will hold the number of code points in `input`. */\n\t\t    inputLength,\n\t\t    /** Cached calculation results */\n\t\t    handledCPCountPlusOne,\n\t\t    baseMinusT,\n\t\t    qMinusT;\n\n\t\t// Convert the input in UCS-2 to Unicode\n\t\tinput = ucs2decode(input);\n\n\t\t// Cache the length\n\t\tinputLength = input.length;\n\n\t\t// Initialize the state\n\t\tn = initialN;\n\t\tdelta = 0;\n\t\tbias = initialBias;\n\n\t\t// Handle the basic code points\n\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\tcurrentValue = input[j];\n\t\t\tif (currentValue < 0x80) {\n\t\t\t\toutput.push(stringFromCharCode(currentValue));\n\t\t\t}\n\t\t}\n\n\t\thandledCPCount = basicLength = output.length;\n\n\t\t// `handledCPCount` is the number of code points that have been handled;\n\t\t// `basicLength` is the number of basic code points.\n\n\t\t// Finish the basic string - if it is not empty - with a delimiter\n\t\tif (basicLength) {\n\t\t\toutput.push(delimiter);\n\t\t}\n\n\t\t// Main encoding loop:\n\t\twhile (handledCPCount < inputLength) {\n\n\t\t\t// All non-basic code points < n have been handled already. Find the next\n\t\t\t// larger one:\n\t\t\tfor (m = maxInt, j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\t\t\t\tif (currentValue >= n && currentValue < m) {\n\t\t\t\t\tm = currentValue;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,\n\t\t\t// but guard against overflow\n\t\t\thandledCPCountPlusOne = handledCPCount + 1;\n\t\t\tif (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {\n\t\t\t\terror('overflow');\n\t\t\t}\n\n\t\t\tdelta += (m - n) * handledCPCountPlusOne;\n\t\t\tn = m;\n\n\t\t\tfor (j = 0; j < inputLength; ++j) {\n\t\t\t\tcurrentValue = input[j];\n\n\t\t\t\tif (currentValue < n && ++delta > maxInt) {\n\t\t\t\t\terror('overflow');\n\t\t\t\t}\n\n\t\t\t\tif (currentValue == n) {\n\t\t\t\t\t// Represent delta as a generalized variable-length integer\n\t\t\t\t\tfor (q = delta, k = base; /* no condition */; k += base) {\n\t\t\t\t\t\tt = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);\n\t\t\t\t\t\tif (q < t) {\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tqMinusT = q - t;\n\t\t\t\t\t\tbaseMinusT = base - t;\n\t\t\t\t\t\toutput.push(\n\t\t\t\t\t\t\tstringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))\n\t\t\t\t\t\t);\n\t\t\t\t\t\tq = floor(qMinusT / baseMinusT);\n\t\t\t\t\t}\n\n\t\t\t\t\toutput.push(stringFromCharCode(digitToBasic(q, 0)));\n\t\t\t\t\tbias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);\n\t\t\t\t\tdelta = 0;\n\t\t\t\t\t++handledCPCount;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t++delta;\n\t\t\t++n;\n\n\t\t}\n\t\treturn output.join('');\n\t}\n\n\t/**\n\t * Converts a Punycode string representing a domain name or an email address\n\t * to Unicode. Only the Punycoded parts of the input will be converted, i.e.\n\t * it doesn't matter if you call it on a string that has already been\n\t * converted to Unicode.\n\t * @memberOf punycode\n\t * @param {String} input The Punycoded domain name or email address to\n\t * convert to Unicode.\n\t * @returns {String} The Unicode representation of the given Punycode\n\t * string.\n\t */\n\tfunction toUnicode(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexPunycode.test(string)\n\t\t\t\t? decode(string.slice(4).toLowerCase())\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/**\n\t * Converts a Unicode string representing a domain name or an email address to\n\t * Punycode. Only the non-ASCII parts of the domain name will be converted,\n\t * i.e. it doesn't matter if you call it with a domain that's already in\n\t * ASCII.\n\t * @memberOf punycode\n\t * @param {String} input The domain name or email address to convert, as a\n\t * Unicode string.\n\t * @returns {String} The Punycode representation of the given domain name or\n\t * email address.\n\t */\n\tfunction toASCII(input) {\n\t\treturn mapDomain(input, function(string) {\n\t\t\treturn regexNonASCII.test(string)\n\t\t\t\t? 'xn--' + encode(string)\n\t\t\t\t: string;\n\t\t});\n\t}\n\n\t/*--------------------------------------------------------------------------*/\n\n\t/** Define the public API */\n\tpunycode = {\n\t\t/**\n\t\t * A string representing the current Punycode.js version number.\n\t\t * @memberOf punycode\n\t\t * @type String\n\t\t */\n\t\t'version': '1.4.1',\n\t\t/**\n\t\t * An object of methods to convert from JavaScript's internal character\n\t\t * representation (UCS-2) to Unicode code points, and back.\n\t\t * @see <https://mathiasbynens.be/notes/javascript-encoding>\n\t\t * @memberOf punycode\n\t\t * @type Object\n\t\t */\n\t\t'ucs2': {\n\t\t\t'decode': ucs2decode,\n\t\t\t'encode': ucs2encode\n\t\t},\n\t\t'decode': decode,\n\t\t'encode': encode,\n\t\t'toASCII': toASCII,\n\t\t'toUnicode': toUnicode\n\t};\n\n\t/** Expose `punycode` */\n\t// Some AMD build optimizers, like r.js, check for specific condition patterns\n\t// like the following:\n\tif (\n\t\ttrue\n\t) {\n\t\t!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n\t\t\treturn punycode;\n\t\t}).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n\n}(this));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module), __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/node-libs-browser/node_modules/punycode/punycode.js?");

/***/ }),

/***/ "./node_modules/normalize-url/index.js":
/*!*********************************************!*\
  !*** ./node_modules/normalize-url/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar url = __webpack_require__(/*! url */ \"./node_modules/url/url.js\");\nvar punycode = __webpack_require__(/*! punycode */ \"./node_modules/node-libs-browser/node_modules/punycode/punycode.js\");\nvar queryString = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\nvar prependHttp = __webpack_require__(/*! prepend-http */ \"./node_modules/prepend-http/index.js\");\nvar sortKeys = __webpack_require__(/*! sort-keys */ \"./node_modules/sort-keys/index.js\");\nvar objectAssign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\nvar DEFAULT_PORTS = {\n\t'http:': 80,\n\t'https:': 443,\n\t'ftp:': 21\n};\n\n// protocols that always contain a `//`` bit\nvar slashedProtocol = {\n\t'http': true,\n\t'https': true,\n\t'ftp': true,\n\t'gopher': true,\n\t'file': true,\n\t'http:': true,\n\t'https:': true,\n\t'ftp:': true,\n\t'gopher:': true,\n\t'file:': true\n};\n\nfunction testParameter(name, filters) {\n\treturn filters.some(function (filter) {\n\t\treturn filter instanceof RegExp ? filter.test(name) : filter === name;\n\t});\n}\n\nmodule.exports = function (str, opts) {\n\topts = objectAssign({\n\t\tnormalizeProtocol: true,\n\t\tnormalizeHttps: false,\n\t\tstripFragment: true,\n\t\tstripWWW: true,\n\t\tremoveQueryParameters: [/^utm_\\w+/i],\n\t\tremoveTrailingSlash: true,\n\t\tremoveDirectoryIndex: false\n\t}, opts);\n\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\tvar hasRelativeProtocol = str.indexOf('//') === 0;\n\n\t// prepend protocol\n\tstr = prependHttp(str.trim()).replace(/^\\/\\//, 'http://');\n\n\tvar urlObj = url.parse(str);\n\n\tif (opts.normalizeHttps && urlObj.protocol === 'https:') {\n\t\turlObj.protocol = 'http:';\n\t}\n\n\tif (!urlObj.hostname && !urlObj.pathname) {\n\t\tthrow new Error('Invalid URL');\n\t}\n\n\t// prevent these from being used by `url.format`\n\tdelete urlObj.host;\n\tdelete urlObj.query;\n\n\t// remove fragment\n\tif (opts.stripFragment) {\n\t\tdelete urlObj.hash;\n\t}\n\n\t// remove default port\n\tvar port = DEFAULT_PORTS[urlObj.protocol];\n\tif (Number(urlObj.port) === port) {\n\t\tdelete urlObj.port;\n\t}\n\n\t// remove duplicate slashes\n\tif (urlObj.pathname) {\n\t\turlObj.pathname = urlObj.pathname.replace(/\\/{2,}/g, '/');\n\t}\n\n\t// decode URI octets\n\tif (urlObj.pathname) {\n\t\turlObj.pathname = decodeURI(urlObj.pathname);\n\t}\n\n\t// remove directory index\n\tif (opts.removeDirectoryIndex === true) {\n\t\topts.removeDirectoryIndex = [/^index\\.[a-z]+$/];\n\t}\n\n\tif (Array.isArray(opts.removeDirectoryIndex) && opts.removeDirectoryIndex.length) {\n\t\tvar pathComponents = urlObj.pathname.split('/');\n\t\tvar lastComponent = pathComponents[pathComponents.length - 1];\n\n\t\tif (testParameter(lastComponent, opts.removeDirectoryIndex)) {\n\t\t\tpathComponents = pathComponents.slice(0, pathComponents.length - 1);\n\t\t\turlObj.pathname = pathComponents.slice(1).join('/') + '/';\n\t\t}\n\t}\n\n\t// resolve relative paths, but only for slashed protocols\n\tif (slashedProtocol[urlObj.protocol]) {\n\t\tvar domain = urlObj.protocol + '//' + urlObj.hostname;\n\t\tvar relative = url.resolve(domain, urlObj.pathname);\n\t\turlObj.pathname = relative.replace(domain, '');\n\t}\n\n\tif (urlObj.hostname) {\n\t\t// IDN to Unicode\n\t\turlObj.hostname = punycode.toUnicode(urlObj.hostname).toLowerCase();\n\n\t\t// remove trailing dot\n\t\turlObj.hostname = urlObj.hostname.replace(/\\.$/, '');\n\n\t\t// remove `www.`\n\t\tif (opts.stripWWW) {\n\t\t\turlObj.hostname = urlObj.hostname.replace(/^www\\./, '');\n\t\t}\n\t}\n\n\t// remove URL with empty query string\n\tif (urlObj.search === '?') {\n\t\tdelete urlObj.search;\n\t}\n\n\tvar queryParameters = queryString.parse(urlObj.search);\n\n\t// remove query unwanted parameters\n\tif (Array.isArray(opts.removeQueryParameters)) {\n\t\tfor (var key in queryParameters) {\n\t\t\tif (testParameter(key, opts.removeQueryParameters)) {\n\t\t\t\tdelete queryParameters[key];\n\t\t\t}\n\t\t}\n\t}\n\n\t// sort query parameters\n\turlObj.search = queryString.stringify(sortKeys(queryParameters));\n\n\t// decode query parameters\n\turlObj.search = decodeURIComponent(urlObj.search);\n\n\t// take advantage of many of the Node `url` normalizations\n\tstr = url.format(urlObj);\n\n\t// remove ending `/`\n\tif (opts.removeTrailingSlash || urlObj.pathname === '/') {\n\t\tstr = str.replace(/\\/$/, '');\n\t}\n\n\t// restore relative protocol, if applicable\n\tif (hasRelativeProtocol && !opts.normalizeProtocol) {\n\t\tstr = str.replace(/^http:\\/\\//, '//');\n\t}\n\n\treturn str;\n};\n\n\n//# sourceURL=webpack:///./node_modules/normalize-url/index.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!******************************************************************************************************!*\
  !*** delegated ./node_modules/object-assign/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(116);\n\n//# sourceURL=webpack:///delegated_./node_modules/object-assign/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/prepend-http/index.js":
/*!********************************************!*\
  !*** ./node_modules/prepend-http/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = function (url) {\n\tif (typeof url !== 'string') {\n\t\tthrow new TypeError('Expected a string, got ' + typeof url);\n\t}\n\n\turl = url.trim();\n\n\tif (/^\\.*\\/|^(?!localhost)\\w+:/.test(url)) {\n\t\treturn url;\n\t}\n\n\treturn url.replace(/^(?!(?:\\w+:)?\\/\\/)/, 'http://');\n};\n\n\n//# sourceURL=webpack:///./node_modules/prepend-http/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!***************************************************************************************************!*\
  !*** delegated ./node_modules/prop-types/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(1);\n\n//# sourceURL=webpack:///delegated_./node_modules/prop-types/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar strictUriEncode = __webpack_require__(/*! strict-uri-encode */ \"./node_modules/strict-uri-encode/index.js\");\nvar objectAssign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\nfunction encoderForArrayFormat(opts) {\n\tswitch (opts.arrayFormat) {\n\t\tcase 'index':\n\t\t\treturn function (key, value, index) {\n\t\t\t\treturn value === null ? [\n\t\t\t\t\tencode(key, opts),\n\t\t\t\t\t'[',\n\t\t\t\t\tindex,\n\t\t\t\t\t']'\n\t\t\t\t].join('') : [\n\t\t\t\t\tencode(key, opts),\n\t\t\t\t\t'[',\n\t\t\t\t\tencode(index, opts),\n\t\t\t\t\t']=',\n\t\t\t\t\tencode(value, opts)\n\t\t\t\t].join('');\n\t\t\t};\n\n\t\tcase 'bracket':\n\t\t\treturn function (key, value) {\n\t\t\t\treturn value === null ? encode(key, opts) : [\n\t\t\t\t\tencode(key, opts),\n\t\t\t\t\t'[]=',\n\t\t\t\t\tencode(value, opts)\n\t\t\t\t].join('');\n\t\t\t};\n\n\t\tdefault:\n\t\t\treturn function (key, value) {\n\t\t\t\treturn value === null ? encode(key, opts) : [\n\t\t\t\t\tencode(key, opts),\n\t\t\t\t\t'=',\n\t\t\t\t\tencode(value, opts)\n\t\t\t\t].join('');\n\t\t\t};\n\t}\n}\n\nfunction parserForArrayFormat(opts) {\n\tvar result;\n\n\tswitch (opts.arrayFormat) {\n\t\tcase 'index':\n\t\t\treturn function (key, value, accumulator) {\n\t\t\t\tresult = /\\[(\\d*)\\]$/.exec(key);\n\n\t\t\t\tkey = key.replace(/\\[\\d*\\]$/, '');\n\n\t\t\t\tif (!result) {\n\t\t\t\t\taccumulator[key] = value;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (accumulator[key] === undefined) {\n\t\t\t\t\taccumulator[key] = {};\n\t\t\t\t}\n\n\t\t\t\taccumulator[key][result[1]] = value;\n\t\t\t};\n\n\t\tcase 'bracket':\n\t\t\treturn function (key, value, accumulator) {\n\t\t\t\tresult = /(\\[\\])$/.exec(key);\n\t\t\t\tkey = key.replace(/\\[\\]$/, '');\n\n\t\t\t\tif (!result) {\n\t\t\t\t\taccumulator[key] = value;\n\t\t\t\t\treturn;\n\t\t\t\t} else if (accumulator[key] === undefined) {\n\t\t\t\t\taccumulator[key] = [value];\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\taccumulator[key] = [].concat(accumulator[key], value);\n\t\t\t};\n\n\t\tdefault:\n\t\t\treturn function (key, value, accumulator) {\n\t\t\t\tif (accumulator[key] === undefined) {\n\t\t\t\t\taccumulator[key] = value;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\taccumulator[key] = [].concat(accumulator[key], value);\n\t\t\t};\n\t}\n}\n\nfunction encode(value, opts) {\n\tif (opts.encode) {\n\t\treturn opts.strict ? strictUriEncode(value) : encodeURIComponent(value);\n\t}\n\n\treturn value;\n}\n\nfunction keysSorter(input) {\n\tif (Array.isArray(input)) {\n\t\treturn input.sort();\n\t} else if (typeof input === 'object') {\n\t\treturn keysSorter(Object.keys(input)).sort(function (a, b) {\n\t\t\treturn Number(a) - Number(b);\n\t\t}).map(function (key) {\n\t\t\treturn input[key];\n\t\t});\n\t}\n\n\treturn input;\n}\n\nexports.extract = function (str) {\n\treturn str.split('?')[1] || '';\n};\n\nexports.parse = function (str, opts) {\n\topts = objectAssign({arrayFormat: 'none'}, opts);\n\n\tvar formatter = parserForArrayFormat(opts);\n\n\t// Create an object with no prototype\n\t// https://github.com/sindresorhus/query-string/issues/47\n\tvar ret = Object.create(null);\n\n\tif (typeof str !== 'string') {\n\t\treturn ret;\n\t}\n\n\tstr = str.trim().replace(/^(\\?|#|&)/, '');\n\n\tif (!str) {\n\t\treturn ret;\n\t}\n\n\tstr.split('&').forEach(function (param) {\n\t\tvar parts = param.replace(/\\+/g, ' ').split('=');\n\t\t// Firefox (pre 40) decodes `%3D` to `=`\n\t\t// https://github.com/sindresorhus/query-string/pull/37\n\t\tvar key = parts.shift();\n\t\tvar val = parts.length > 0 ? parts.join('=') : undefined;\n\n\t\t// missing `=` should be `null`:\n\t\t// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters\n\t\tval = val === undefined ? null : decodeURIComponent(val);\n\n\t\tformatter(decodeURIComponent(key), val, ret);\n\t});\n\n\treturn Object.keys(ret).sort().reduce(function (result, key) {\n\t\tvar val = ret[key];\n\t\tif (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {\n\t\t\t// Sort object keys, not values\n\t\t\tresult[key] = keysSorter(val);\n\t\t} else {\n\t\t\tresult[key] = val;\n\t\t}\n\n\t\treturn result;\n\t}, Object.create(null));\n};\n\nexports.stringify = function (obj, opts) {\n\tvar defaults = {\n\t\tencode: true,\n\t\tstrict: true,\n\t\tarrayFormat: 'none'\n\t};\n\n\topts = objectAssign(defaults, opts);\n\n\tvar formatter = encoderForArrayFormat(opts);\n\n\treturn obj ? Object.keys(obj).sort().map(function (key) {\n\t\tvar val = obj[key];\n\n\t\tif (val === undefined) {\n\t\t\treturn '';\n\t\t}\n\n\t\tif (val === null) {\n\t\t\treturn encode(key, opts);\n\t\t}\n\n\t\tif (Array.isArray(val)) {\n\t\t\tvar result = [];\n\n\t\t\tval.slice().forEach(function (val2) {\n\t\t\t\tif (val2 === undefined) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tresult.push(formatter(key, val2, result.length));\n\t\t\t});\n\n\t\t\treturn result.join('&');\n\t\t}\n\n\t\treturn encode(key, opts) + '=' + encode(val, opts);\n\t}).filter(function (x) {\n\t\treturn x.length > 0;\n\t}).join('&') : '';\n};\n\n\n//# sourceURL=webpack:///./node_modules/query-string/index.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\n// If obj.hasOwnProperty has been overridden, then calling\n// obj.hasOwnProperty(prop) will break.\n// See: https://github.com/joyent/node/issues/1707\nfunction hasOwnProperty(obj, prop) {\n  return Object.prototype.hasOwnProperty.call(obj, prop);\n}\n\nmodule.exports = function(qs, sep, eq, options) {\n  sep = sep || '&';\n  eq = eq || '=';\n  var obj = {};\n\n  if (typeof qs !== 'string' || qs.length === 0) {\n    return obj;\n  }\n\n  var regexp = /\\+/g;\n  qs = qs.split(sep);\n\n  var maxKeys = 1000;\n  if (options && typeof options.maxKeys === 'number') {\n    maxKeys = options.maxKeys;\n  }\n\n  var len = qs.length;\n  // maxKeys <= 0 means that we should not limit keys count\n  if (maxKeys > 0 && len > maxKeys) {\n    len = maxKeys;\n  }\n\n  for (var i = 0; i < len; ++i) {\n    var x = qs[i].replace(regexp, '%20'),\n        idx = x.indexOf(eq),\n        kstr, vstr, k, v;\n\n    if (idx >= 0) {\n      kstr = x.substr(0, idx);\n      vstr = x.substr(idx + 1);\n    } else {\n      kstr = x;\n      vstr = '';\n    }\n\n    k = decodeURIComponent(kstr);\n    v = decodeURIComponent(vstr);\n\n    if (!hasOwnProperty(obj, k)) {\n      obj[k] = v;\n    } else if (isArray(obj[k])) {\n      obj[k].push(v);\n    } else {\n      obj[k] = [obj[k], v];\n    }\n  }\n\n  return obj;\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/decode.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar stringifyPrimitive = function(v) {\n  switch (typeof v) {\n    case 'string':\n      return v;\n\n    case 'boolean':\n      return v ? 'true' : 'false';\n\n    case 'number':\n      return isFinite(v) ? v : '';\n\n    default:\n      return '';\n  }\n};\n\nmodule.exports = function(obj, sep, eq, name) {\n  sep = sep || '&';\n  eq = eq || '=';\n  if (obj === null) {\n    obj = undefined;\n  }\n\n  if (typeof obj === 'object') {\n    return map(objectKeys(obj), function(k) {\n      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;\n      if (isArray(obj[k])) {\n        return map(obj[k], function(v) {\n          return ks + encodeURIComponent(stringifyPrimitive(v));\n        }).join(sep);\n      } else {\n        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));\n      }\n    }).join(sep);\n\n  }\n\n  if (!name) return '';\n  return encodeURIComponent(stringifyPrimitive(name)) + eq +\n         encodeURIComponent(stringifyPrimitive(obj));\n};\n\nvar isArray = Array.isArray || function (xs) {\n  return Object.prototype.toString.call(xs) === '[object Array]';\n};\n\nfunction map (xs, f) {\n  if (xs.map) return xs.map(f);\n  var res = [];\n  for (var i = 0; i < xs.length; i++) {\n    res.push(f(xs[i], i));\n  }\n  return res;\n}\n\nvar objectKeys = Object.keys || function (obj) {\n  var res = [];\n  for (var key in obj) {\n    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);\n  }\n  return res;\n};\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/encode.js?");

/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.decode = exports.parse = __webpack_require__(/*! ./decode */ \"./node_modules/querystring-es3/decode.js\");\nexports.encode = exports.stringify = __webpack_require__(/*! ./encode */ \"./node_modules/querystring-es3/encode.js\");\n\n\n//# sourceURL=webpack:///./node_modules/querystring-es3/index.js?");

/***/ }),

/***/ "./node_modules/react-dom/index.js":
/*!**************************************************************************************************!*\
  !*** delegated ./node_modules/react-dom/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(118);\n\n//# sourceURL=webpack:///delegated_./node_modules/react-dom/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/react-hot-loader/dist/react-hot-loader.development.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-hot-loader/dist/react-hot-loader.development.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\nfunction _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }\n\nvar React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nvar React__default = _interopDefault(React);\nvar shallowEqual = _interopDefault(__webpack_require__(/*! shallowequal */ \"./node_modules/shallowequal/index.js\"));\nvar levenshtein = _interopDefault(__webpack_require__(/*! fast-levenshtein */ \"./node_modules/fast-levenshtein/levenshtein.js\"));\nvar PropTypes = _interopDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\nvar defaultPolyfill = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\nvar defaultPolyfill__default = _interopDefault(defaultPolyfill);\nvar hoistNonReactStatic = _interopDefault(__webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js\"));\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) {\n  return typeof obj;\n} : function (obj) {\n  return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n};\n\nvar classCallCheck = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\nvar _extends = Object.assign || function (target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i];\n\n    for (var key in source) {\n      if (Object.prototype.hasOwnProperty.call(source, key)) {\n        target[key] = source[key];\n      }\n    }\n  }\n\n  return target;\n};\n\nvar inherits = function (subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass);\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;\n};\n\nvar possibleConstructorReturn = function (self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self;\n};\n\n/* eslint-disable no-underscore-dangle */\n\nvar isCompositeComponent = function isCompositeComponent(type) {\n  return typeof type === 'function';\n};\n\nvar getComponentDisplayName = function getComponentDisplayName(type) {\n  var displayName = type.displayName || type.name;\n  return displayName && displayName !== 'ReactComponent' ? displayName : 'Component';\n};\n\nvar reactLifeCycleMountMethods = ['componentWillMount', 'componentDidMount'];\n\nfunction isReactClass(Component) {\n  return !!(Component.prototype && (React__default.Component.prototype.isPrototypeOf(Component.prototype) ||\n  // react 14 support\n  Component.prototype.isReactComponent || Component.prototype.componentWillMount || Component.prototype.componentWillUnmount || Component.prototype.componentDidMount || Component.prototype.componentDidUnmount || Component.prototype.render));\n}\n\nfunction isReactClassInstance(Component) {\n  return Component && isReactClass({ prototype: Object.getPrototypeOf(Component) });\n}\n\nvar getInternalInstance = function getInternalInstance(instance) {\n  return instance._reactInternalFiber || // React 16\n  instance._reactInternalInstance || // React 15\n  null;\n};\n\nvar updateInstance = function updateInstance(instance) {\n  var updater = instance.updater,\n      forceUpdate = instance.forceUpdate;\n\n  if (typeof forceUpdate === 'function') {\n    instance.forceUpdate();\n  } else if (updater && typeof updater.enqueueForceUpdate === 'function') {\n    updater.enqueueForceUpdate(instance);\n  }\n};\n\nvar isFragmentNode = function isFragmentNode(_ref) {\n  var type = _ref.type;\n  return React__default.Fragment && type === React__default.Fragment;\n};\n\nvar ContextType = React__default.createContext ? React__default.createContext() : null;\nvar ConsumerType = ContextType && ContextType.Consumer.$$typeof;\nvar ProviderType = ContextType && ContextType.Provider.$$typeof;\n\nvar CONTEXT_CURRENT_VALUE = '_currentValue';\n\nvar isContextConsumer = function isContextConsumer(_ref2) {\n  var type = _ref2.type;\n  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.$$typeof === ConsumerType;\n};\nvar isContextProvider = function isContextProvider(_ref3) {\n  var type = _ref3.type;\n  return type && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type.$$typeof === ProviderType;\n};\nvar getContextProvider = function getContextProvider(type) {\n  return type && type._context;\n};\n\nvar generation = 1;\n\nvar increment = function increment() {\n  return generation++;\n};\nvar get$1 = function get() {\n  return generation;\n};\n\nvar PREFIX = '__reactstandin__';\nvar PROXY_KEY = PREFIX + 'key';\nvar GENERATION = PREFIX + 'proxyGeneration';\nvar REGENERATE_METHOD = PREFIX + 'regenerateByEval';\nvar UNWRAP_PROXY = PREFIX + 'getCurrent';\nvar CACHED_RESULT = PREFIX + 'cachedResult';\nvar PROXY_IS_MOUNTED = PREFIX + 'isMounted';\n\nvar configuration = {\n  // Log level\n  logLevel: 'error',\n\n  // Allows using SFC without changes. leading to some components not updated\n  pureSFC: false,\n\n  // Allows SFC to be used, enables \"intermediate\" components used by Relay, should be disabled for Preact\n  allowSFC: true,\n\n  // Hook on babel component register.\n  onComponentRegister: false\n};\n\n/* eslint-disable no-console */\n\nvar logger = {\n  debug: function debug() {\n    if (['debug'].indexOf(configuration.logLevel) !== -1) {\n      var _console;\n\n      (_console = console).debug.apply(_console, arguments);\n    }\n  },\n  log: function log() {\n    if (['debug', 'log'].indexOf(configuration.logLevel) !== -1) {\n      var _console2;\n\n      (_console2 = console).log.apply(_console2, arguments);\n    }\n  },\n  warn: function warn() {\n    if (['debug', 'log', 'warn'].indexOf(configuration.logLevel) !== -1) {\n      var _console3;\n\n      (_console3 = console).warn.apply(_console3, arguments);\n    }\n  },\n  error: function error() {\n    if (['debug', 'log', 'warn', 'error'].indexOf(configuration.logLevel) !== -1) {\n      var _console4;\n\n      (_console4 = console).error.apply(_console4, arguments);\n    }\n  }\n};\n\n/* eslint-disable no-eval, func-names */\n\nfunction safeReactConstructor(Component, lastInstance) {\n  try {\n    if (lastInstance) {\n      return new Component(lastInstance.props, lastInstance.context);\n    }\n    return new Component({}, {});\n  } catch (e) {\n    // some components, like Redux connect could not be created without proper context\n  }\n  return null;\n}\n\nfunction isNativeFunction(fn) {\n  return typeof fn === 'function' ? fn.toString().indexOf('[native code]') > 0 : false;\n}\n\nvar identity = function identity(a) {\n  return a;\n};\nvar indirectEval = eval;\n\nvar doesSupportClasses = function () {\n  try {\n    indirectEval('class Test {}');\n    return true;\n  } catch (e) {\n    return false;\n  }\n}();\n\nvar ES6ProxyComponentFactory = doesSupportClasses && indirectEval('\\n(function(InitialParent, postConstructionAction) {\\n  return class ProxyComponent extends InitialParent {\\n    constructor(props, context) {\\n      super(props, context)\\n      postConstructionAction.call(this)\\n    }\\n  }\\n})\\n');\n\nvar ES5ProxyComponentFactory = function ES5ProxyComponentFactory(InitialParent, postConstructionAction) {\n  function ProxyComponent(props, context) {\n    InitialParent.call(this, props, context);\n    postConstructionAction.call(this);\n  }\n  ProxyComponent.prototype = Object.create(InitialParent.prototype);\n  Object.setPrototypeOf(ProxyComponent, InitialParent);\n  return ProxyComponent;\n};\n\nvar proxyClassCreator = doesSupportClasses ? ES6ProxyComponentFactory : ES5ProxyComponentFactory;\n\nfunction getOwnKeys(target) {\n  return [].concat(Object.getOwnPropertyNames(target), Object.getOwnPropertySymbols(target));\n}\n\nfunction shallowStringsEqual(a, b) {\n  for (var key in a) {\n    if (String(a[key]) !== String(b[key])) {\n      return false;\n    }\n  }\n  return true;\n}\n\nfunction deepPrototypeUpdate(dest, source) {\n  var deepDest = Object.getPrototypeOf(dest);\n  var deepSrc = Object.getPrototypeOf(source);\n  if (deepDest && deepSrc && deepSrc !== deepDest) {\n    deepPrototypeUpdate(deepDest, deepSrc);\n  }\n  if (source.prototype && source.prototype !== dest.prototype) {\n    dest.prototype = source.prototype;\n  }\n}\n\nfunction safeDefineProperty(target, key, props) {\n  try {\n    Object.defineProperty(target, key, props);\n  } catch (e) {\n    logger.warn('Error while wrapping', key, ' -> ', e);\n  }\n}\n\nvar RESERVED_STATICS = ['length', 'displayName', 'name', 'arguments', 'caller', 'prototype', 'toString', 'valueOf', 'isStatelessFunctionalProxy', PROXY_KEY, UNWRAP_PROXY];\n\nfunction transferStaticProps(ProxyComponent, savedDescriptors, PreviousComponent, NextComponent) {\n  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {\n    if (RESERVED_STATICS.indexOf(key) !== -1) {\n      return;\n    }\n\n    var prevDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);\n    var savedDescriptor = savedDescriptors[key];\n\n    if (!shallowEqual(prevDescriptor, savedDescriptor)) {\n      safeDefineProperty(NextComponent, key, prevDescriptor);\n    }\n  });\n\n  // Copy newly defined static methods and properties\n  Object.getOwnPropertyNames(NextComponent).forEach(function (key) {\n    if (RESERVED_STATICS.indexOf(key) !== -1) {\n      return;\n    }\n\n    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(ProxyComponent, key);\n    var savedDescriptor = savedDescriptors[key];\n\n    // Skip redefined descriptors\n    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {\n      safeDefineProperty(NextComponent, key, prevDescriptor);\n      return;\n    }\n\n    if (prevDescriptor && !savedDescriptor) {\n      safeDefineProperty(ProxyComponent, key, prevDescriptor);\n      return;\n    }\n\n    var nextDescriptor = _extends({}, Object.getOwnPropertyDescriptor(NextComponent, key), {\n      configurable: true\n    });\n\n    savedDescriptors[key] = nextDescriptor;\n    safeDefineProperty(ProxyComponent, key, nextDescriptor);\n  });\n\n  // Remove static methods and properties that are no longer defined\n  Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {\n    if (RESERVED_STATICS.indexOf(key) !== -1) {\n      return;\n    }\n    // Skip statics that exist on the next class\n    if (NextComponent.hasOwnProperty(key)) {\n      return;\n    }\n    // Skip non-configurable statics\n    var proxyDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);\n    if (proxyDescriptor && !proxyDescriptor.configurable) {\n      return;\n    }\n\n    var prevDescriptor = PreviousComponent && Object.getOwnPropertyDescriptor(PreviousComponent, key);\n    var savedDescriptor = savedDescriptors[key];\n\n    // Skip redefined descriptors\n    if (prevDescriptor && savedDescriptor && !shallowEqual(savedDescriptor, prevDescriptor)) {\n      return;\n    }\n\n    safeDefineProperty(ProxyComponent, key, {\n      value: undefined\n    });\n  });\n\n  return savedDescriptors;\n}\n\nfunction mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers) {\n  var injectedCode = {};\n  try {\n    var nextInstance = safeReactConstructor(NextComponent, lastInstance);\n\n    try {\n      // Bypass babel class inheritance checking\n      deepPrototypeUpdate(InitialComponent, NextComponent);\n    } catch (e) {\n      // It was ES6 class\n    }\n\n    var proxyInstance = safeReactConstructor(ProxyComponent, lastInstance);\n\n    if (!nextInstance || !proxyInstance) {\n      return injectedCode;\n    }\n\n    var mergedAttrs = _extends({}, proxyInstance, nextInstance);\n    var hasRegenerate = proxyInstance[REGENERATE_METHOD];\n    var ownKeys = getOwnKeys(Object.getPrototypeOf(ProxyComponent.prototype));\n    Object.keys(mergedAttrs).forEach(function (key) {\n      if (key.startsWith(PREFIX)) return;\n      var nextAttr = nextInstance[key];\n      var prevAttr = proxyInstance[key];\n      if (nextAttr) {\n        if (isNativeFunction(nextAttr) || isNativeFunction(prevAttr)) {\n          // this is bound method\n          var isSameArity = nextAttr.length === prevAttr.length;\n          var existsInPrototype = ownKeys.indexOf(key) >= 0 || ProxyComponent.prototype[key];\n          if ((isSameArity || !prevAttr) && existsInPrototype) {\n            if (hasRegenerate) {\n              injectedCode[key] = 'Object.getPrototypeOf(this)[\\'' + key + '\\'].bind(this)';\n            } else {\n              logger.warn('React Hot Loader:,', 'Non-controlled class', ProxyComponent.name, 'contains a new native or bound function ', key, nextAttr, '. Unable to reproduce');\n            }\n          } else {\n            logger.warn('React Hot Loader:', 'Updated class ', ProxyComponent.name, 'contains native or bound function ', key, nextAttr, '. Unable to reproduce, use arrow functions instead.', '(arity: ' + nextAttr.length + '/' + prevAttr.length + ', proto: ' + (existsInPrototype ? 'yes' : 'no'));\n          }\n          return;\n        }\n\n        var nextString = String(nextAttr);\n        var injectedBefore = injectedMembers[key];\n        var isArrow = nextString.indexOf('=>') >= 0;\n        var isFunction = nextString.indexOf('function') >= 0 || isArrow;\n        var referToThis = nextString.indexOf('this') >= 0;\n        if (nextString !== String(prevAttr) || injectedBefore && nextString !== String(injectedBefore) || isArrow && referToThis) {\n          if (!hasRegenerate) {\n            if (!isFunction) {\n              // just copy prop over\n              injectedCode[key] = nextAttr;\n            } else {\n              logger.warn('React Hot Loader:', ' Updated class ', ProxyComponent.name, 'had different code for', key, nextAttr, '. Unable to reproduce. Regeneration support needed.');\n            }\n          } else {\n            injectedCode[key] = nextAttr;\n          }\n        }\n      }\n    });\n  } catch (e) {\n    logger.warn('React Hot Loader:', e);\n  }\n  return injectedCode;\n}\n\nfunction checkLifeCycleMethods(ProxyComponent, NextComponent) {\n  try {\n    var p1 = Object.getPrototypeOf(ProxyComponent.prototype);\n    var p2 = NextComponent.prototype;\n    reactLifeCycleMountMethods.forEach(function (key) {\n      var d1 = Object.getOwnPropertyDescriptor(p1, key) || { value: p1[key] };\n      var d2 = Object.getOwnPropertyDescriptor(p2, key) || { value: p2[key] };\n      if (!shallowStringsEqual(d1, d2)) {\n        logger.warn('React Hot Loader:', 'You did update', ProxyComponent.name, 's lifecycle method', key, '. Unable to repeat');\n      }\n    });\n  } catch (e) {\n    // Ignore errors\n  }\n}\n\nfunction inject(target, currentGeneration, injectedMembers) {\n  if (target[GENERATION] !== currentGeneration) {\n    var hasRegenerate = !!target[REGENERATE_METHOD];\n    Object.keys(injectedMembers).forEach(function (key) {\n      try {\n        if (hasRegenerate) {\n          var usedThis = String(injectedMembers[key]).match(/_this([\\d]+)/gi) || [];\n          target[REGENERATE_METHOD](key, '(function REACT_HOT_LOADER_SANDBOX () {\\n          var _this  = this; // common babel transpile\\n          ' + usedThis.map(function (name) {\n            return 'var ' + name + ' = this;';\n          }) + '\\n\\n          return ' + injectedMembers[key] + ';\\n          }).call(this)');\n        } else {\n          target[key] = injectedMembers[key];\n        }\n      } catch (e) {\n        logger.warn('React Hot Loader: Failed to regenerate method ', key, ' of class ', target);\n        logger.warn('got error', e);\n      }\n    });\n\n    target[GENERATION] = currentGeneration;\n  }\n}\n\nvar has = Object.prototype.hasOwnProperty;\n\nvar proxies = new WeakMap();\n\nvar resetClassProxies = function resetClassProxies() {\n  proxies = new WeakMap();\n};\n\nvar blackListedClassMembers = ['constructor', 'render', 'componentWillMount', 'componentDidMount', 'componentWillReceiveProps', 'componentWillUnmount', 'hotComponentRender', 'getInitialState', 'getDefaultProps'];\n\nvar defaultRenderOptions = {\n  componentWillRender: identity,\n  componentDidUpdate: function componentDidUpdate(result) {\n    return result;\n  },\n  componentDidRender: function componentDidRender(result) {\n    return result;\n  }\n};\n\nvar defineClassMember = function defineClassMember(Class, methodName, methodBody) {\n  return safeDefineProperty(Class.prototype, methodName, {\n    configurable: true,\n    writable: true,\n    enumerable: false,\n    value: methodBody\n  });\n};\n\nvar defineClassMembers = function defineClassMembers(Class, methods) {\n  return Object.keys(methods).forEach(function (methodName) {\n    return defineClassMember(Class, methodName, methods[methodName]);\n  });\n};\n\nvar setSFPFlag = function setSFPFlag(component, flag) {\n  return safeDefineProperty(component, 'isStatelessFunctionalProxy', {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: flag\n  });\n};\n\nvar copyMethodDescriptors = function copyMethodDescriptors(target, source) {\n  if (source) {\n    // it is possible to use `function-double` to construct an ideal clone, but does not make a sence\n    var keys = Object.getOwnPropertyNames(source);\n\n    keys.forEach(function (key) {\n      return safeDefineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n\n    safeDefineProperty(target, 'toString', {\n      configurable: true,\n      writable: false,\n      enumerable: false,\n      value: function toString() {\n        return String(source);\n      }\n    });\n  }\n\n  return target;\n};\n\nfunction createClassProxy(InitialComponent, proxyKey, options) {\n  var renderOptions = _extends({}, defaultRenderOptions, options);\n  // Prevent double wrapping.\n  // Given a proxy class, return the existing proxy managing it.\n  var existingProxy = proxies.get(InitialComponent);\n\n  if (existingProxy) {\n    return existingProxy;\n  }\n\n  var CurrentComponent = void 0;\n  var savedDescriptors = {};\n  var injectedMembers = {};\n  var proxyGeneration = 0;\n  var classUpdatePostponed = null;\n  var instancesCount = 0;\n  var isFunctionalComponent = !isReactClass(InitialComponent);\n\n  var lastInstance = null;\n\n  function postConstructionAction() {\n    this[GENERATION] = 0;\n\n    lastInstance = this;\n    // is there is an update pending\n    if (classUpdatePostponed) {\n      var callUpdate = classUpdatePostponed;\n      classUpdatePostponed = null;\n      callUpdate();\n    }\n    // As long we can't override constructor\n    // every class shall evolve from a base class\n    inject(this, proxyGeneration, injectedMembers);\n  }\n\n  function proxiedUpdate() {\n    if (this) {\n      inject(this, proxyGeneration, injectedMembers);\n    }\n  }\n\n  function lifeCycleWrapperFactory(wrapperName) {\n    var sideEffect = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : identity;\n\n    return copyMethodDescriptors(function wrappedMethod() {\n      proxiedUpdate.call(this);\n      sideEffect(this);\n\n      for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {\n        rest[_key] = arguments[_key];\n      }\n\n      return !isFunctionalComponent && CurrentComponent.prototype[wrapperName] && CurrentComponent.prototype[wrapperName].apply(this, rest);\n    }, InitialComponent.prototype && InitialComponent.prototype[wrapperName]);\n  }\n\n  function methodWrapperFactory(wrapperName, realMethod) {\n    return copyMethodDescriptors(function wrappedMethod() {\n      for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        rest[_key2] = arguments[_key2];\n      }\n\n      return realMethod.apply(this, rest);\n    }, realMethod);\n  }\n\n  var fakeBasePrototype = function fakeBasePrototype(Base) {\n    return Object.getOwnPropertyNames(Base).filter(function (key) {\n      return blackListedClassMembers.indexOf(key) === -1;\n    }).filter(function (key) {\n      var descriptor = Object.getOwnPropertyDescriptor(Base, key);\n      return typeof descriptor.value === 'function';\n    }).reduce(function (acc, key) {\n      acc[key] = methodWrapperFactory(key, Base[key]);\n      return acc;\n    }, {});\n  };\n\n  var componentDidMount = lifeCycleWrapperFactory('componentDidMount', function (target) {\n    target[PROXY_IS_MOUNTED] = true;\n    instancesCount++;\n  });\n  var componentDidUpdate = lifeCycleWrapperFactory('componentDidUpdate', renderOptions.componentDidUpdate);\n  var componentWillUnmount = lifeCycleWrapperFactory('componentWillUnmount', function (target) {\n    target[PROXY_IS_MOUNTED] = false;\n    instancesCount--;\n  });\n\n  function hotComponentRender() {\n    // repeating subrender call to keep RENDERED_GENERATION up to date\n    renderOptions.componentWillRender(this);\n    proxiedUpdate.call(this);\n    var result = void 0;\n\n    // We need to use hasOwnProperty here, as the cached result is a React node\n    // and can be null or some other falsy value.\n    if (has.call(this, CACHED_RESULT)) {\n      result = this[CACHED_RESULT];\n      delete this[CACHED_RESULT];\n    } else if (isFunctionalComponent) {\n      result = CurrentComponent(this.props, this.context);\n    } else {\n      result = (CurrentComponent.prototype.render || this.render).apply(this,\n      // eslint-disable-next-line prefer-rest-params\n      arguments);\n    }\n\n    return renderOptions.componentDidRender.call(this, result);\n  }\n\n  function proxiedRender() {\n    renderOptions.componentWillRender(this);\n\n    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n      args[_key3] = arguments[_key3];\n    }\n\n    return hotComponentRender.call.apply(hotComponentRender, [this].concat(args));\n  }\n\n  var defineProxyMethods = function defineProxyMethods(Proxy) {\n    var Base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    defineClassMembers(Proxy, _extends({}, fakeBasePrototype(Base), {\n      render: proxiedRender,\n      hotComponentRender: hotComponentRender,\n      componentDidMount: componentDidMount,\n      componentDidUpdate: componentDidUpdate,\n      componentWillUnmount: componentWillUnmount\n    }));\n  };\n\n  var _ProxyFacade = void 0;\n  var ProxyComponent = null;\n  var proxy = void 0;\n\n  if (!isFunctionalComponent) {\n    // Component\n    ProxyComponent = proxyClassCreator(InitialComponent, postConstructionAction);\n\n    defineProxyMethods(ProxyComponent, InitialComponent.prototype);\n\n    _ProxyFacade = ProxyComponent;\n  } else if (!configuration.allowSFC) {\n    // SFC Converted to component. Does not support returning precreated instances from render.\n    ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);\n\n    defineProxyMethods(ProxyComponent);\n    _ProxyFacade = ProxyComponent;\n  } else {\n    // SFC\n\n    // This function only gets called for the initial mount. The actual\n    // rendered component instance will be the return value.\n\n    // eslint-disable-next-line func-names\n    _ProxyFacade = function ProxyFacade(props, context) {\n      var result = CurrentComponent(props, context);\n\n      // simple SFC, could continue to be SFC\n      if (configuration.pureSFC) {\n        if (!CurrentComponent.contextTypes) {\n          if (!_ProxyFacade.isStatelessFunctionalProxy) {\n            setSFPFlag(_ProxyFacade, true);\n          }\n\n          return renderOptions.componentDidRender(result);\n        }\n      }\n      setSFPFlag(_ProxyFacade, false);\n\n      // This is a Relay-style container constructor. We can't do the prototype-\n      // style wrapping for this as we do elsewhere, so just we just pass it\n      // through as-is.\n      if (isReactClassInstance(result)) {\n        ProxyComponent = null;\n\n        // Relay lazily sets statics like getDerivedStateFromProps on initial\n        // render in lazy construction, so we need to do the same here.\n        transferStaticProps(_ProxyFacade, savedDescriptors, null, CurrentComponent);\n\n        return result;\n      }\n\n      // Otherwise, it's a normal functional component. Build the real proxy\n      // and use it going forward.\n      ProxyComponent = proxyClassCreator(React.Component, postConstructionAction);\n\n      defineProxyMethods(ProxyComponent);\n\n      var determinateResult = new ProxyComponent(props, context);\n\n      // Cache the initial render result so we don't call the component function\n      // a second time for the initial render.\n      determinateResult[CACHED_RESULT] = result;\n      return determinateResult;\n    };\n  }\n\n  function get$$1() {\n    return _ProxyFacade;\n  }\n\n  function getCurrent() {\n    return CurrentComponent;\n  }\n\n  safeDefineProperty(_ProxyFacade, UNWRAP_PROXY, {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: getCurrent\n  });\n\n  safeDefineProperty(_ProxyFacade, PROXY_KEY, {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: proxyKey\n  });\n\n  safeDefineProperty(_ProxyFacade, 'toString', {\n    configurable: true,\n    writable: false,\n    enumerable: false,\n    value: function toString() {\n      return String(CurrentComponent);\n    }\n  });\n\n  function update(NextComponent) {\n    if (typeof NextComponent !== 'function') {\n      throw new Error('Expected a constructor.');\n    }\n\n    if (NextComponent === CurrentComponent) {\n      return;\n    }\n\n    // Prevent proxy cycles\n    var existingProxy = proxies.get(NextComponent);\n    if (existingProxy) {\n      return;\n    }\n\n    isFunctionalComponent = !isReactClass(NextComponent);\n\n    proxies.set(NextComponent, proxy);\n\n    proxyGeneration++;\n\n    // Save the next constructor so we call it\n    var PreviousComponent = CurrentComponent;\n    CurrentComponent = NextComponent;\n\n    // Try to infer displayName\n    var displayName = getComponentDisplayName(CurrentComponent);\n\n    safeDefineProperty(_ProxyFacade, 'displayName', {\n      configurable: true,\n      writable: false,\n      enumerable: true,\n      value: displayName\n    });\n\n    if (ProxyComponent) {\n      safeDefineProperty(ProxyComponent, 'name', {\n        value: displayName\n      });\n    }\n\n    savedDescriptors = transferStaticProps(_ProxyFacade, savedDescriptors, PreviousComponent, NextComponent);\n\n    if (isFunctionalComponent || !ProxyComponent) ; else {\n      var classHotReplacement = function classHotReplacement() {\n        checkLifeCycleMethods(ProxyComponent, NextComponent);\n        Object.setPrototypeOf(ProxyComponent.prototype, NextComponent.prototype);\n        defineProxyMethods(ProxyComponent, NextComponent.prototype);\n        if (proxyGeneration > 1) {\n          injectedMembers = mergeComponents(ProxyComponent, NextComponent, InitialComponent, lastInstance, injectedMembers);\n        }\n      };\n\n      // Was constructed once\n      if (instancesCount > 0) {\n        classHotReplacement();\n      } else {\n        classUpdatePostponed = classHotReplacement;\n      }\n    }\n  }\n\n  update(InitialComponent);\n\n  var dereference = function dereference() {\n    proxies.delete(InitialComponent);\n    proxies.delete(_ProxyFacade);\n    proxies.delete(CurrentComponent);\n  };\n\n  proxy = { get: get$$1, update: update, dereference: dereference, getCurrent: function getCurrent() {\n      return CurrentComponent;\n    } };\n\n  proxies.set(InitialComponent, proxy);\n  proxies.set(_ProxyFacade, proxy);\n\n  safeDefineProperty(proxy, UNWRAP_PROXY, {\n    configurable: false,\n    writable: false,\n    enumerable: false,\n    value: getCurrent\n  });\n\n  return proxy;\n}\n\nvar proxiesByID = void 0;\nvar blackListedProxies = void 0;\nvar idsByType = void 0;\n\nvar elementCount = 0;\nvar renderOptions = {};\n\nvar generateTypeId = function generateTypeId() {\n  return 'auto-' + elementCount++;\n};\n\nvar getIdByType = function getIdByType(type) {\n  return idsByType.get(type);\n};\nvar isProxyType = function isProxyType(type) {\n  return type[PROXY_KEY];\n};\n\nvar getProxyById = function getProxyById(id) {\n  return proxiesByID[id];\n};\nvar getProxyByType = function getProxyByType(type) {\n  return getProxyById(getIdByType(type));\n};\n\nvar setStandInOptions = function setStandInOptions(options) {\n  renderOptions = options;\n};\n\nvar updateProxyById = function updateProxyById(id, type) {\n  // Remember the ID.\n  idsByType.set(type, id);\n\n  if (!proxiesByID[id]) {\n    proxiesByID[id] = createClassProxy(type, id, renderOptions);\n  } else {\n    proxiesByID[id].update(type);\n  }\n  return proxiesByID[id];\n};\n\nvar createProxyForType = function createProxyForType(type) {\n  return getProxyByType(type) || updateProxyById(generateTypeId(), type);\n};\n\nvar isTypeBlacklisted = function isTypeBlacklisted(type) {\n  return blackListedProxies.has(type);\n};\nvar blacklistByType = function blacklistByType(type) {\n  return blackListedProxies.set(type, true);\n};\n\nvar resetProxies = function resetProxies() {\n  proxiesByID = {};\n  idsByType = new WeakMap();\n  blackListedProxies = new WeakMap();\n  resetClassProxies();\n};\n\nresetProxies();\n\nvar tune = {\n  allowSFC: false\n};\n\nvar preactAdapter = function preactAdapter(instance, resolveType) {\n  var oldHandler = instance.options.vnode;\n\n  Object.assign(configuration, tune);\n\n  instance.options.vnode = function (vnode) {\n    vnode.nodeName = resolveType(vnode.nodeName);\n    if (oldHandler) {\n      oldHandler(vnode);\n    }\n  };\n};\n\n/* eslint-disable no-use-before-define */\n\nfunction _resolveType(type) {\n  if (!isCompositeComponent(type) || isTypeBlacklisted(type) || isProxyType(type)) return type;\n\n  var proxy = reactHotLoader.disableProxyCreation ? getProxyByType(type) : createProxyForType(type);\n\n  return proxy ? proxy.get() : type;\n}\n\nvar reactHotLoader = {\n  register: function register(type, uniqueLocalName, fileName) {\n    if (isCompositeComponent(type) && typeof uniqueLocalName === 'string' && uniqueLocalName && typeof fileName === 'string' && fileName) {\n      var id = fileName + '#' + uniqueLocalName;\n      var proxy = getProxyById(id);\n\n      if (proxy && proxy.getCurrent() !== type) {\n        // component got replaced. Need to reconcile\n        increment();\n\n        if (isTypeBlacklisted(type) || isTypeBlacklisted(proxy.getCurrent())) {\n          logger.error('React-hot-loader: Cold component', uniqueLocalName, 'at', fileName, 'has been updated');\n        }\n      }\n\n      if (configuration.onComponentRegister) {\n        configuration.onComponentRegister(type, uniqueLocalName, fileName);\n      }\n\n      updateProxyById(id, type);\n    }\n  },\n  reset: function reset() {\n    resetProxies();\n  },\n  preact: function preact(instance) {\n    preactAdapter(instance, _resolveType);\n  },\n  resolveType: function resolveType(type) {\n    return _resolveType(type);\n  },\n  patch: function patch(React$$1) {\n    if (!React$$1.createElement.isPatchedByReactHotLoader) {\n      var originalCreateElement = React$$1.createElement;\n      // Trick React into rendering a proxy so that\n      // its state is preserved when the class changes.\n      // This will update the proxy if it's for a known type.\n      React$$1.createElement = function (type) {\n        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n          args[_key - 1] = arguments[_key];\n        }\n\n        return originalCreateElement.apply(undefined, [_resolveType(type)].concat(args));\n      };\n      React$$1.createElement.isPatchedByReactHotLoader = true;\n    }\n\n    if (!React$$1.createFactory.isPatchedByReactHotLoader) {\n      // Patch React.createFactory to use patched createElement\n      // because the original implementation uses the internal,\n      // unpatched ReactElement.createElement\n      React$$1.createFactory = function (type) {\n        var factory = React$$1.createElement.bind(null, type);\n        factory.type = type;\n        return factory;\n      };\n      React$$1.createFactory.isPatchedByReactHotLoader = true;\n    }\n\n    if (!React$$1.Children.only.isPatchedByReactHotLoader) {\n      var originalChildrenOnly = React$$1.Children.only;\n      // Use the same trick as React.createElement\n      React$$1.Children.only = function (children) {\n        return originalChildrenOnly(_extends({}, children, { type: _resolveType(children.type) }));\n      };\n      React$$1.Children.only.isPatchedByReactHotLoader = true;\n    }\n\n    reactHotLoader.reset();\n  },\n\n\n  disableProxyCreation: false\n};\n\n/* eslint-disable no-underscore-dangle */\n\nfunction pushStack(stack, node) {\n  stack.type = node.type;\n  stack.children = [];\n  stack.instance = typeof node.type === 'function' ? node.stateNode : stack;\n\n  if (!stack.instance) {\n    stack.instance = {\n      SFC_fake: stack.type,\n      props: {},\n      render: function render() {\n        return stack.type(stack.instance.props);\n      }\n    };\n  }\n}\n\nfunction hydrateFiberStack(node, stack) {\n  pushStack(stack, node);\n  if (node.child) {\n    var child = node.child;\n\n    do {\n      var childStack = {};\n      hydrateFiberStack(child, childStack);\n      stack.children.push(childStack);\n      child = child.sibling;\n    } while (child);\n  }\n}\n\n/* eslint-disable no-underscore-dangle */\n\nfunction pushState(stack, type, instance) {\n  stack.type = type;\n  stack.children = [];\n  stack.instance = instance || stack;\n\n  if (typeof type === 'function' && type.isStatelessFunctionalProxy) {\n    // In React 15 SFC is wrapped by component. We have to detect our proxies and change the way it works\n    stack.instance = {\n      SFC_fake: type,\n      props: {},\n      render: function render() {\n        return type(stack.instance.props);\n      }\n    };\n  }\n}\n\nfunction hydrateLegacyStack(node, stack) {\n  if (node._currentElement) {\n    pushState(stack, node._currentElement.type, node._instance || stack);\n  }\n\n  if (node._renderedComponent) {\n    var childStack = {};\n    hydrateLegacyStack(node._renderedComponent, childStack);\n    stack.children.push(childStack);\n  } else if (node._renderedChildren) {\n    Object.keys(node._renderedChildren).forEach(function (key) {\n      var childStack = {};\n      hydrateLegacyStack(node._renderedChildren[key], childStack);\n      stack.children.push(childStack);\n    });\n  }\n}\n\n/* eslint-disable no-underscore-dangle */\n\nfunction getReactStack(instance) {\n  var rootNode = getInternalInstance(instance);\n  var stack = {};\n  if (rootNode) {\n    // React stack\n    var isFiber = typeof rootNode.tag === 'number';\n    if (isFiber) {\n      hydrateFiberStack(rootNode, stack);\n    } else {\n      hydrateLegacyStack(rootNode, stack);\n    }\n  }\n\n  return stack;\n}\n\n// some `empty` names, React can autoset display name to...\nvar UNDEFINED_NAMES = {\n  Unknown: true,\n  Component: true\n};\n\nvar renderStack = [];\n\nvar stackReport = function stackReport() {\n  var rev = renderStack.slice().reverse();\n  logger.warn('in', rev[0].name, rev);\n};\n\nvar emptyMap = new Map();\nvar stackContext = function stackContext() {\n  return (renderStack[renderStack.length - 1] || {}).context || emptyMap;\n};\nvar areNamesEqual = function areNamesEqual(a, b) {\n  return a === b || UNDEFINED_NAMES[a] && UNDEFINED_NAMES[b];\n};\nvar shouldUseRenderMethod = function shouldUseRenderMethod(fn) {\n  return fn && (isReactClassInstance(fn) || fn.SFC_fake);\n};\n\nvar isFunctional = function isFunctional(fn) {\n  return typeof fn === 'function';\n};\nvar isArray = function isArray(fn) {\n  return Array.isArray(fn);\n};\nvar asArray = function asArray(a) {\n  return isArray(a) ? a : [a];\n};\nvar getTypeOf = function getTypeOf(type) {\n  if (isReactClass(type)) return 'ReactComponent';\n  if (isFunctional(type)) return 'StatelessFunctional';\n  return 'Fragment'; // ?\n};\n\nvar filterNullArray = function filterNullArray(a) {\n  if (!a) return [];\n  return a.filter(function (x) {\n    return !!x;\n  });\n};\n\nvar unflatten = function unflatten(a) {\n  return a.reduce(function (acc, a) {\n    if (Array.isArray(a)) {\n      acc.push.apply(acc, unflatten(a));\n    } else {\n      acc.push(a);\n    }\n    return acc;\n  }, []);\n};\n\nvar getElementType = function getElementType(child) {\n  return child.type[UNWRAP_PROXY] ? child.type[UNWRAP_PROXY]() : child.type;\n};\n\nvar haveTextSimilarity = function haveTextSimilarity(a, b) {\n  return (\n    // equal or slight changed\n    a === b || levenshtein.get(a, b) < a.length * 0.2\n  );\n};\n\nvar equalClasses = function equalClasses(a, b) {\n  var prototypeA = a.prototype;\n  var prototypeB = Object.getPrototypeOf(b.prototype);\n\n  var hits = 0;\n  var misses = 0;\n  var comparisons = 0;\n  Object.getOwnPropertyNames(prototypeA).forEach(function (key) {\n    if (typeof prototypeA[key] === 'function' && key !== 'constructor') {\n      comparisons++;\n      if (haveTextSimilarity(String(prototypeA[key]), String(prototypeB[key]))) {\n        hits++;\n      } else {\n        misses++;\n        if (key === 'render') {\n          misses++;\n        }\n      }\n    }\n  });\n  // allow to add or remove one function\n  return hits > 0 && misses <= 1 || comparisons === 0;\n};\n\nvar areSwappable = function areSwappable(a, b) {\n  // both are registered components\n  if (getIdByType(b) && getIdByType(a) === getIdByType(b)) {\n    return true;\n  }\n  if (getTypeOf(a) !== getTypeOf(b)) {\n    return false;\n  }\n  if (isReactClass(a)) {\n    return areNamesEqual(getComponentDisplayName(a), getComponentDisplayName(b)) && equalClasses(a, b);\n  }\n\n  if (isFunctional(a)) {\n    var nameA = getComponentDisplayName(a);\n    return areNamesEqual(nameA, getComponentDisplayName(b)) && nameA !== 'Component' || haveTextSimilarity(String(a), String(b));\n  }\n  return false;\n};\n\nvar render = function render(component) {\n  if (!component) {\n    return [];\n  }\n  if (shouldUseRenderMethod(component)) {\n    // not calling real render method to prevent call recursion.\n    // stateless components does not have hotComponentRender\n    return component.hotComponentRender ? component.hotComponentRender() : component.render();\n  }\n  if (isArray(component)) {\n    return component.map(render);\n  }\n  if (component.children) {\n    return component.children;\n  }\n\n  return [];\n};\n\nvar NO_CHILDREN = { children: [] };\nvar mapChildren = function mapChildren(children, instances) {\n  return {\n    children: children.filter(function (c) {\n      return c;\n    }).map(function (child, index) {\n      if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || child.isMerged) {\n        return child;\n      }\n      var instanceLine = instances[index] || {};\n      var oldChildren = asArray(instanceLine.children || []);\n\n      if (Array.isArray(child)) {\n        return _extends({\n          type: null\n        }, mapChildren(child, oldChildren));\n      }\n\n      var newChildren = asArray(child.props && child.props.children || child.children || []);\n      var nextChildren = child.type !== 'function' && oldChildren.length && mapChildren(newChildren, oldChildren);\n\n      return _extends({\n        nextProps: child.props,\n        isMerged: true\n      }, instanceLine, nextChildren || {}, {\n        type: child.type\n      });\n    })\n  };\n};\n\nvar mergeInject = function mergeInject(a, b, instance) {\n  if (a && !Array.isArray(a)) {\n    return mergeInject([a], b);\n  }\n  if (b && !Array.isArray(b)) {\n    return mergeInject(a, [b]);\n  }\n\n  if (!a || !b) {\n    return NO_CHILDREN;\n  }\n  if (a.length === b.length) {\n    return mapChildren(a, b);\n  }\n\n  // in some cases (no confidence here) B could contain A except null children\n  // in some cases - could not.\n  // this depends on React version and the way you build component.\n\n  var nonNullA = filterNullArray(a);\n  if (nonNullA.length === b.length) {\n    return mapChildren(nonNullA, b);\n  }\n\n  var flatA = unflatten(nonNullA);\n  var flatB = unflatten(b);\n  if (flatA.length === flatB.length) {\n    return mapChildren(flatA, flatB);\n  }\n  if (flatB.length === 0 && flatA.length === 1 && _typeof(flatA[0]) !== 'object') ; else {\n    logger.warn('React-hot-loader: unable to merge ', a, 'and children of ', instance);\n    stackReport();\n  }\n  return NO_CHILDREN;\n};\n\nvar transformFlowNode = function transformFlowNode(flow) {\n  return flow.reduce(function (acc, node) {\n    if (node && isFragmentNode(node)) {\n      if (node.props && node.props.children) {\n        return [].concat(acc, filterNullArray(asArray(node.props.children)));\n      }\n      if (node.children) {\n        return [].concat(acc, filterNullArray(asArray(node.children)));\n      }\n    }\n    return [].concat(acc, [node]);\n  }, []);\n};\n\nvar scheduledUpdates = [];\nvar scheduledUpdate = 0;\n\nvar flushScheduledUpdates = function flushScheduledUpdates() {\n  var instances = scheduledUpdates;\n  scheduledUpdates = [];\n  scheduledUpdate = 0;\n  instances.forEach(function (instance) {\n    return instance[PROXY_IS_MOUNTED] && updateInstance(instance);\n  });\n};\n\nvar unscheduleUpdate = function unscheduleUpdate(instance) {\n  scheduledUpdates = scheduledUpdates.filter(function (inst) {\n    return inst !== instance;\n  });\n};\n\nvar scheduleInstanceUpdate = function scheduleInstanceUpdate(instance) {\n  scheduledUpdates.push(instance);\n  if (!scheduledUpdate) {\n    scheduledUpdate = setTimeout(flushScheduledUpdates);\n  }\n};\n\nvar hotReplacementRender = function hotReplacementRender(instance, stack) {\n  if (isReactClassInstance(instance)) {\n    var type = getElementType(stack);\n\n    renderStack.push({\n      name: getComponentDisplayName(type),\n      type: type,\n      props: stack.instance.props,\n      context: stackContext()\n    });\n  }\n  var flow = transformFlowNode(filterNullArray(asArray(render(instance))));\n\n  var children = stack.children;\n\n\n  flow.forEach(function (child, index) {\n    var stackChild = children[index];\n    var next = function next(instance) {\n      // copy over props as long new component may be hidden inside them\n      // child does not have all props, as long some of them can be calculated on componentMount.\n      var realProps = instance.props;\n      var nextProps = _extends({}, realProps, child.nextProps || {}, child.props || {});\n\n      if (isReactClassInstance(instance) && instance.componentWillUpdate) {\n        // Force-refresh component (bypass redux renderedComponent)\n        instance.componentWillUpdate(_extends({}, realProps), instance.state);\n      }\n      instance.props = nextProps;\n      hotReplacementRender(instance, stackChild);\n      instance.props = realProps;\n    };\n\n    // text node\n    if ((typeof child === 'undefined' ? 'undefined' : _typeof(child)) !== 'object' || !stackChild || !stackChild.instance) {\n      if (stackChild && stackChild.children && stackChild.children.length) {\n        logger.error('React-hot-loader: reconciliation failed', 'could not dive into [', child, '] while some elements are still present in the tree.');\n        stackReport();\n      }\n      return;\n    }\n\n    if (_typeof(child.type) !== _typeof(stackChild.type)) {\n      // Portals could generate undefined !== null\n      if (child.type && stackChild.type) {\n        logger.warn('React-hot-loader: got ', child.type, 'instead of', stackChild.type);\n        stackReport();\n      }\n      return;\n    }\n\n    // React context\n    if (isContextConsumer(child)) {\n      try {\n        next({\n          children: (child.props ? child.props.children : child.children[0])(stackContext().get(child.type) || child.type[CONTEXT_CURRENT_VALUE])\n        });\n      } catch (e) {\n        // do nothing, yet\n      }\n    } else if (typeof child.type !== 'function') {\n      // React\n      var childName = child.type ? getComponentDisplayName(child.type) : 'empty';\n      var extraContext = stackContext();\n\n      if (isContextProvider(child)) {\n        extraContext = new Map(extraContext);\n        extraContext.set(getContextProvider(child.type), _extends({}, child.nextProps || {}, child.props || {}).value);\n        childName = 'ContextProvider';\n      }\n\n      renderStack.push({\n        name: childName,\n        type: child.type,\n        props: stack.instance.props,\n        context: extraContext\n      });\n\n      next(\n      // move types from render to the instances of hydrated tree\n      mergeInject(transformFlowNode(asArray(child.props ? child.props.children : child.children)), stackChild.instance.children, stackChild.instance));\n      renderStack.pop();\n    } else {\n      if (child.type === stackChild.type) {\n        next(stackChild.instance);\n      } else {\n        // unwrap proxy\n        var childType = getElementType(child);\n        if (!stackChild.type[PROXY_KEY]) {\n          if (isTypeBlacklisted(stackChild.type)) {\n            logger.warn('React-hot-loader: cold element got updated ', stackChild.type);\n            return;\n          }\n          /* eslint-disable no-console */\n          logger.error('React-hot-loader: fatal error caused by ', stackChild.type, ' - no instrumentation found. ', 'Please require react-hot-loader before React. More in troubleshooting.');\n          stackReport();\n          throw new Error('React-hot-loader: wrong configuration');\n        }\n\n        if (areSwappable(childType, stackChild.type)) {\n          // they are both registered, or have equal code/displayname/signature\n\n          // update proxy using internal PROXY_KEY\n          updateProxyById(stackChild.type[PROXY_KEY], childType);\n\n          next(stackChild.instance);\n        } else {\n          logger.warn('React-hot-loader: a ' + getComponentDisplayName(childType) + ' was found where a ' + getComponentDisplayName(stackChild) + ' was expected.\\n          ' + childType);\n          stackReport();\n        }\n      }\n\n      scheduleInstanceUpdate(stackChild.instance);\n    }\n  });\n\n  if (isReactClassInstance(instance)) {\n    renderStack.pop();\n  }\n};\n\nvar hotComponentCompare = function hotComponentCompare(oldType, newType) {\n  if (oldType === newType) {\n    return true;\n  }\n\n  if (areSwappable(newType, oldType)) {\n    getProxyByType(newType[UNWRAP_PROXY]()).dereference();\n    updateProxyById(oldType[PROXY_KEY], newType[UNWRAP_PROXY]());\n    updateProxyById(newType[PROXY_KEY], oldType[UNWRAP_PROXY]());\n    return true;\n  }\n\n  return false;\n};\n\nvar hotReplacementRender$1 = (function (instance, stack) {\n  try {\n    // disable reconciler to prevent upcoming components from proxying.\n    reactHotLoader.disableProxyCreation = true;\n    renderStack = [];\n    hotReplacementRender(instance, stack);\n  } catch (e) {\n    logger.warn('React-hot-loader: reconcilation failed due to error', e);\n  } finally {\n    reactHotLoader.disableProxyCreation = false;\n  }\n});\n\nvar reconcileHotReplacement = function reconcileHotReplacement(ReactInstance) {\n  return hotReplacementRender$1(ReactInstance, getReactStack(ReactInstance));\n};\n\nvar RENDERED_GENERATION = 'REACT_HOT_LOADER_RENDERED_GENERATION';\n\nvar renderReconciler = function renderReconciler(target, force) {\n  // we are not inside parent reconcilation\n  var currentGeneration = get$1();\n  var componentGeneration = target[RENDERED_GENERATION];\n\n  target[RENDERED_GENERATION] = currentGeneration;\n\n  if (!reactHotLoader.disableProxyCreation) {\n    if ((componentGeneration || force) && componentGeneration !== currentGeneration) {\n      reconcileHotReplacement(target);\n      return true;\n    }\n  }\n  return false;\n};\n\nfunction asyncReconciledRender(target) {\n  renderReconciler(target, false);\n}\n\nfunction proxyWrapper(element) {\n  // post wrap on post render\n  if (!reactHotLoader.disableProxyCreation) {\n    unscheduleUpdate(this);\n  }\n\n  if (!element) {\n    return element;\n  }\n  if (Array.isArray(element)) {\n    return element.map(proxyWrapper);\n  }\n  if (typeof element.type === 'function') {\n    var proxy = getProxyByType(element.type);\n    if (proxy) {\n      return _extends({}, element, {\n        type: proxy.get()\n      });\n    }\n  }\n  return element;\n}\n\nsetStandInOptions({\n  componentWillRender: asyncReconciledRender,\n  componentDidRender: proxyWrapper,\n  componentDidUpdate: flushScheduledUpdates\n});\n\nvar AppContainer = function (_React$Component) {\n  inherits(AppContainer, _React$Component);\n\n  function AppContainer() {\n    var _temp, _this, _ret;\n\n    classCallCheck(this, AppContainer);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {\n      error: null,\n      // eslint-disable-next-line react/no-unused-state\n      generation: 0\n    }, _temp), possibleConstructorReturn(_this, _ret);\n  }\n\n  AppContainer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {\n    if (prevState.generation !== get$1()) {\n      // Hot reload is happening.\n      return {\n        error: null,\n        generation: get$1()\n      };\n    }\n    return null;\n  };\n\n  AppContainer.prototype.shouldComponentUpdate = function shouldComponentUpdate(prevProps, prevState) {\n    // Don't update the component if the state had an error and still has one.\n    // This allows to break an infinite loop of error -> render -> error -> render\n    // https://github.com/gaearon/react-hot-loader/issues/696\n    if (prevState.error && this.state.error) {\n      return false;\n    }\n\n    return true;\n  };\n\n  AppContainer.prototype.componentDidCatch = function componentDidCatch(error) {\n    logger.error(error);\n    this.setState({ error: error });\n  };\n\n  AppContainer.prototype.render = function render() {\n    var error = this.state.error;\n\n\n    if (this.props.errorReporter && error) {\n      return React__default.createElement(this.props.errorReporter, { error: error });\n    }\n\n    return React__default.Children.only(this.props.children);\n  };\n\n  return AppContainer;\n}(React__default.Component);\n\nAppContainer.propTypes = {\n  children: function children(props) {\n    if (React__default.Children.count(props.children) !== 1) {\n      return new Error('Invalid prop \"children\" supplied to AppContainer. ' + 'Expected a single React element with your app’s root component, e.g. <App />.');\n    }\n\n    return undefined;\n  },\n\n  errorReporter: PropTypes.oneOfType([PropTypes.node, PropTypes.func])\n\n  //  trying first react-lifecycles-compat.polyfill, then trying react-lifecycles-compat, which could be .default\n};var realPolyfill = defaultPolyfill.polyfill || defaultPolyfill__default;\nrealPolyfill(AppContainer);\n\nvar openedModules = {};\n\nvar hotModules = {};\n\nvar createHotModule = function createHotModule() {\n  return { instances: [], updateTimeout: 0 };\n};\n\nvar hotModule = function hotModule(moduleId) {\n  if (!hotModules[moduleId]) {\n    hotModules[moduleId] = createHotModule();\n  }\n  return hotModules[moduleId];\n};\n\nvar isOpened = function isOpened(sourceModule) {\n  return sourceModule && !!openedModules[sourceModule.id];\n};\n\nvar enter = function enter(sourceModule) {\n  if (sourceModule && sourceModule.id) {\n    openedModules[sourceModule.id] = true;\n  } else {\n    logger.warn('React-hot-loader: no `module` variable found. Do you shadow system variable?');\n  }\n};\n\nvar leave = function leave(sourceModule) {\n  if (sourceModule && sourceModule.id) {\n    delete openedModules[sourceModule.id];\n  }\n};\n\n/* eslint-disable camelcase, no-undef */\nvar requireIndirect =  true ? __webpack_require__ : undefined;\n/* eslint-enable */\n\nvar createHoc = function createHoc(SourceComponent, TargetComponent) {\n  hoistNonReactStatic(TargetComponent, SourceComponent);\n  TargetComponent.displayName = 'HotExported' + getComponentDisplayName(SourceComponent);\n  return TargetComponent;\n};\n\nvar makeHotExport = function makeHotExport(sourceModule) {\n  var updateInstances = function updateInstances() {\n    var module = hotModule(sourceModule.id);\n    clearTimeout(module.updateTimeout);\n    module.updateTimeout = setTimeout(function () {\n      try {\n        requireIndirect(sourceModule.id);\n      } catch (e) {\n        // just swallow\n      }\n      module.instances.forEach(function (inst) {\n        return inst.forceUpdate();\n      });\n    });\n  };\n\n  if (sourceModule.hot) {\n    // Mark as self-accepted for Webpack\n    // Update instances for Parcel\n    sourceModule.hot.accept(updateInstances);\n\n    // Webpack way\n    if (sourceModule.hot.addStatusHandler) {\n      if (sourceModule.hot.status() === 'idle') {\n        sourceModule.hot.addStatusHandler(function (status) {\n          if (status === 'apply') {\n            updateInstances();\n          }\n        });\n      }\n    }\n  }\n};\n\nvar hot = function hot(sourceModule) {\n  if (!sourceModule || !sourceModule.id) {\n    // this is fatal\n    throw new Error('React-hot-loader: `hot` could not find the `id` property in the `module` you have provided');\n  }\n  var moduleId = sourceModule.id;\n  var module = hotModule(moduleId);\n  makeHotExport(sourceModule);\n\n  // TODO: Ensure that all exports from this file are react components.\n\n  return function (WrappedComponent) {\n    // register proxy for wrapped component\n    reactHotLoader.register(WrappedComponent, getComponentDisplayName(WrappedComponent), 'RHL' + moduleId);\n\n    return createHoc(WrappedComponent, function (_Component) {\n      inherits(ExportedComponent, _Component);\n\n      function ExportedComponent() {\n        classCallCheck(this, ExportedComponent);\n        return possibleConstructorReturn(this, _Component.apply(this, arguments));\n      }\n\n      ExportedComponent.prototype.componentDidMount = function componentDidMount() {\n        module.instances.push(this);\n      };\n\n      ExportedComponent.prototype.componentWillUnmount = function componentWillUnmount() {\n        var _this2 = this;\n\n        if (isOpened(sourceModule)) {\n          var componentName = getComponentDisplayName(WrappedComponent);\n          logger.error('React-hot-loader: Detected AppContainer unmount on module \\'' + moduleId + '\\' update.\\n' + ('Did you use \"hot(' + componentName + ')\" and \"ReactDOM.render()\" in the same file?\\n') + ('\"hot(' + componentName + ')\" shall only be used as export.\\n') + 'Please refer to \"Getting Started\" (https://github.com/gaearon/react-hot-loader/).');\n        }\n        module.instances = module.instances.filter(function (a) {\n          return a !== _this2;\n        });\n      };\n\n      ExportedComponent.prototype.render = function render() {\n        return React__default.createElement(\n          AppContainer,\n          null,\n          React__default.createElement(WrappedComponent, this.props)\n        );\n      };\n\n      return ExportedComponent;\n    }(React.Component));\n  };\n};\n\nvar getProxyOrType = function getProxyOrType(type) {\n  var proxy = getProxyByType(type);\n  return proxy ? proxy.get() : type;\n};\n\nvar areComponentsEqual = function areComponentsEqual(a, b) {\n  return getProxyOrType(a) === getProxyOrType(b);\n};\n\nvar compareOrSwap = function compareOrSwap(oldType, newType) {\n  return hotComponentCompare(oldType, newType);\n};\n\nvar cold = function cold(type) {\n  blacklistByType(type);\n  return type;\n};\n\nvar setConfig = function setConfig(config) {\n  return Object.assign(configuration, config);\n};\n\nreactHotLoader.patch(React__default);\n\nexports.default = reactHotLoader;\nexports.AppContainer = AppContainer;\nexports.hot = hot;\nexports.enterModule = enter;\nexports.leaveModule = leave;\nexports.areComponentsEqual = areComponentsEqual;\nexports.compareOrSwap = compareOrSwap;\nexports.cold = cold;\nexports.setConfig = setConfig;\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/dist/react-hot-loader.development.js?");

/***/ }),

/***/ "./node_modules/react-hot-loader/index.js":
/*!************************************************!*\
  !*** ./node_modules/react-hot-loader/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.development.js */ \"./node_modules/react-hot-loader/dist/react-hot-loader.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/index.js?");

/***/ }),

/***/ "./node_modules/react-hot-loader/patch.js":
/*!************************************************!*\
  !*** ./node_modules/react-hot-loader/patch.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./dist/react-hot-loader.development.js */ \"./node_modules/react-hot-loader/dist/react-hot-loader.development.js\");\n}\n\n\n//# sourceURL=webpack:///./node_modules/react-hot-loader/patch.js?");

/***/ }),

/***/ "./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js ***!
  \****************************************************************************/
/*! exports provided: polyfill */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyfill\", function() { return polyfill; });\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nfunction componentWillMount() {\n  // Call this.constructor.gDSFP to support sub-classes.\n  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);\n  if (state !== null && state !== undefined) {\n    this.setState(state);\n  }\n}\n\nfunction componentWillReceiveProps(nextProps) {\n  // Call this.constructor.gDSFP to support sub-classes.\n  // Use the setState() updater to ensure state isn't stale in certain edge cases.\n  function updater(prevState) {\n    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);\n    return state !== null && state !== undefined ? state : null;\n  }\n  // Binding \"this\" is important for shallow renderer support.\n  this.setState(updater.bind(this));\n}\n\nfunction componentWillUpdate(nextProps, nextState) {\n  try {\n    var prevProps = this.props;\n    var prevState = this.state;\n    this.props = nextProps;\n    this.state = nextState;\n    this.__reactInternalSnapshotFlag = true;\n    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(\n      prevProps,\n      prevState\n    );\n  } finally {\n    this.props = prevProps;\n    this.state = prevState;\n  }\n}\n\n// React may warn about cWM/cWRP/cWU methods being deprecated.\n// Add a flag to suppress these warnings for this special case.\ncomponentWillMount.__suppressDeprecationWarning = true;\ncomponentWillReceiveProps.__suppressDeprecationWarning = true;\ncomponentWillUpdate.__suppressDeprecationWarning = true;\n\nfunction polyfill(Component) {\n  var prototype = Component.prototype;\n\n  if (!prototype || !prototype.isReactComponent) {\n    throw new Error('Can only polyfill class components');\n  }\n\n  if (\n    typeof Component.getDerivedStateFromProps !== 'function' &&\n    typeof prototype.getSnapshotBeforeUpdate !== 'function'\n  ) {\n    return Component;\n  }\n\n  // If new component APIs are defined, \"unsafe\" lifecycles won't be called.\n  // Error if any of these lifecycles are present,\n  // Because they would work differently between older and newer (16.3+) versions of React.\n  var foundWillMountName = null;\n  var foundWillReceivePropsName = null;\n  var foundWillUpdateName = null;\n  if (typeof prototype.componentWillMount === 'function') {\n    foundWillMountName = 'componentWillMount';\n  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {\n    foundWillMountName = 'UNSAFE_componentWillMount';\n  }\n  if (typeof prototype.componentWillReceiveProps === 'function') {\n    foundWillReceivePropsName = 'componentWillReceiveProps';\n  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {\n    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';\n  }\n  if (typeof prototype.componentWillUpdate === 'function') {\n    foundWillUpdateName = 'componentWillUpdate';\n  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {\n    foundWillUpdateName = 'UNSAFE_componentWillUpdate';\n  }\n  if (\n    foundWillMountName !== null ||\n    foundWillReceivePropsName !== null ||\n    foundWillUpdateName !== null\n  ) {\n    var componentName = Component.displayName || Component.name;\n    var newApiName =\n      typeof Component.getDerivedStateFromProps === 'function'\n        ? 'getDerivedStateFromProps()'\n        : 'getSnapshotBeforeUpdate()';\n\n    throw Error(\n      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +\n        componentName +\n        ' uses ' +\n        newApiName +\n        ' but also contains the following legacy lifecycles:' +\n        (foundWillMountName !== null ? '\\n  ' + foundWillMountName : '') +\n        (foundWillReceivePropsName !== null\n          ? '\\n  ' + foundWillReceivePropsName\n          : '') +\n        (foundWillUpdateName !== null ? '\\n  ' + foundWillUpdateName : '') +\n        '\\n\\nThe above lifecycles should be removed. Learn more about this warning here:\\n' +\n        'https://fb.me/react-async-component-lifecycle-hooks'\n    );\n  }\n\n  // React <= 16.2 does not support static getDerivedStateFromProps.\n  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.\n  // Newer versions of React will ignore these lifecycles if gDSFP exists.\n  if (typeof Component.getDerivedStateFromProps === 'function') {\n    prototype.componentWillMount = componentWillMount;\n    prototype.componentWillReceiveProps = componentWillReceiveProps;\n  }\n\n  // React <= 16.2 does not support getSnapshotBeforeUpdate.\n  // As a workaround, use cWU to invoke the new lifecycle.\n  // Newer versions of React will ignore that lifecycle if gSBU exists.\n  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {\n    if (typeof prototype.componentDidUpdate !== 'function') {\n      throw new Error(\n        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'\n      );\n    }\n\n    prototype.componentWillUpdate = componentWillUpdate;\n\n    var componentDidUpdate = prototype.componentDidUpdate;\n\n    prototype.componentDidUpdate = function componentDidUpdatePolyfill(\n      prevProps,\n      prevState,\n      maybeSnapshot\n    ) {\n      // 16.3+ will not execute our will-update method;\n      // It will pass a snapshot value to did-update though.\n      // Older versions will require our polyfilled will-update value.\n      // We need to handle both cases, but can't just check for the presence of \"maybeSnapshot\",\n      // Because for <= 15.x versions this might be a \"prevContext\" object.\n      // We also can't just check \"__reactInternalSnapshot\",\n      // Because get-snapshot might return a falsy value.\n      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.\n      var snapshot = this.__reactInternalSnapshotFlag\n        ? this.__reactInternalSnapshot\n        : maybeSnapshot;\n\n      componentDidUpdate.call(this, prevProps, prevState, snapshot);\n    };\n  }\n\n  return Component;\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js?");

/***/ }),

/***/ "./node_modules/react-redux/es/index.js":
/*!*******************************************************************************************************!*\
  !*** delegated ./node_modules/react-redux/es/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*******************************************************************************************************/
/*! exports provided: Provider, createProvider, connectAdvanced, connect */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(55);\n\n//# sourceURL=webpack:///delegated_./node_modules/react-redux/es/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/react-universal-component/dist sync recursive":
/*!**********************************************************!*\
  !*** ./node_modules/react-universal-component/dist sync ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./node_modules/react-universal-component/dist sync recursive\";\n\n//# sourceURL=webpack:///./node_modules/react-universal-component/dist_sync?");

/***/ }),

/***/ "./node_modules/react-universal-component/dist/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-universal-component/dist/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = exports.setHasBabelPlugin = exports.ReportChunks = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _requireUniversalModule = __webpack_require__(/*! ./requireUniversalModule */ \"./node_modules/react-universal-component/dist/requireUniversalModule.js\");\n\nObject.defineProperty(exports, 'CHUNK_NAMES', {\n  enumerable: true,\n  get: function get() {\n    return _requireUniversalModule.CHUNK_NAMES;\n  }\n});\nObject.defineProperty(exports, 'MODULE_IDS', {\n  enumerable: true,\n  get: function get() {\n    return _requireUniversalModule.MODULE_IDS;\n  }\n});\n\nvar _reportChunks = __webpack_require__(/*! ./report-chunks */ \"./node_modules/react-universal-component/dist/report-chunks.js\");\n\nObject.defineProperty(exports, 'ReportChunks', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_reportChunks).default;\n  }\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _hoistNonReactStatics = __webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js\");\n\nvar _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);\n\nvar _requireUniversalModule2 = _interopRequireDefault(_requireUniversalModule);\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./node_modules/react-universal-component/dist/utils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nvar hasBabelPlugin = false;\n\nvar isHMR = function isHMR() {\n  return (\n    // $FlowIgnore\n    module.hot && (module.hot.data || module.hot.status() === 'apply')\n  );\n};\n\nvar setHasBabelPlugin = exports.setHasBabelPlugin = function setHasBabelPlugin() {\n  hasBabelPlugin = true;\n};\n\nfunction universal(component) {\n  var _class, _temp;\n\n  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  var _opts$loading = opts.loading,\n      Loading = _opts$loading === undefined ? _utils.DefaultLoading : _opts$loading,\n      _opts$error = opts.error,\n      Err = _opts$error === undefined ? _utils.DefaultError : _opts$error,\n      _opts$minDelay = opts.minDelay,\n      minDelay = _opts$minDelay === undefined ? 0 : _opts$minDelay,\n      _opts$alwaysDelay = opts.alwaysDelay,\n      alwaysDelay = _opts$alwaysDelay === undefined ? false : _opts$alwaysDelay,\n      _opts$testBabelPlugin = opts.testBabelPlugin,\n      testBabelPlugin = _opts$testBabelPlugin === undefined ? false : _opts$testBabelPlugin,\n      _opts$loadingTransiti = opts.loadingTransition,\n      loadingTransition = _opts$loadingTransiti === undefined ? true : _opts$loadingTransiti,\n      options = _objectWithoutProperties(opts, ['loading', 'error', 'minDelay', 'alwaysDelay', 'testBabelPlugin', 'loadingTransition']);\n\n  var isDynamic = hasBabelPlugin || testBabelPlugin;\n  options.isDynamic = isDynamic;\n  options.usesBabelPlugin = hasBabelPlugin;\n  options.modCache = {};\n  options.promCache = {};\n\n  return _temp = _class = function (_React$Component) {\n    _inherits(UniversalComponent, _React$Component);\n\n    _createClass(UniversalComponent, null, [{\n      key: 'preload',\n\n      /* eslint-enable react/sort-comp */\n\n      /* eslint-disable react/sort-comp */\n      value: function preload(props) {\n        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n        props = props || {};\n\n        var _req = (0, _requireUniversalModule2.default)(component, options, props),\n            requireAsync = _req.requireAsync,\n            requireSync = _req.requireSync;\n\n        var Component = void 0;\n\n        try {\n          Component = requireSync(props, context);\n        } catch (error) {\n          return Promise.reject(error);\n        }\n\n        return Promise.resolve().then(function () {\n          if (Component) return Component;\n          return requireAsync(props, context);\n        }).then(function (Component) {\n          (0, _hoistNonReactStatics2.default)(UniversalComponent, Component, {\n            preload: true,\n            preloadWeak: true\n          });\n          return Component;\n        });\n      }\n    }, {\n      key: 'preloadWeak',\n      value: function preloadWeak(props) {\n        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n        props = props || {};\n\n        var _req2 = (0, _requireUniversalModule2.default)(component, options, props),\n            requireSync = _req2.requireSync;\n\n        var Component = requireSync(props, context);\n        if (Component) {\n          (0, _hoistNonReactStatics2.default)(UniversalComponent, Component, {\n            preload: true,\n            preloadWeak: true\n          });\n        }\n\n        return Component;\n      }\n    }]);\n\n    function UniversalComponent(props, context) {\n      _classCallCheck(this, UniversalComponent);\n\n      var _this = _possibleConstructorReturn(this, (UniversalComponent.__proto__ || Object.getPrototypeOf(UniversalComponent)).call(this, props, context));\n\n      _this.update = function (state) {\n        var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n        var isSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n        var isServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;\n\n        if (!_this._mounted) return;\n        if (!state.error) state.error = null;\n\n        _this.handleAfter(state, isMount, isSync, isServer);\n      };\n\n      _this.state = { error: null };\n      return _this;\n    }\n\n    _createClass(UniversalComponent, [{\n      key: 'componentWillMount',\n      value: function componentWillMount() {\n        this._mounted = true;\n\n        var _req3 = (0, _requireUniversalModule2.default)(component, options, this.props),\n            addModule = _req3.addModule,\n            requireSync = _req3.requireSync,\n            requireAsync = _req3.requireAsync,\n            asyncOnly = _req3.asyncOnly;\n\n        var Component = void 0;\n\n        try {\n          Component = requireSync(this.props, this.context);\n        } catch (error) {\n          return this.update({ error: error });\n        }\n\n        this._asyncOnly = asyncOnly;\n        var chunkName = addModule(this.props); // record the module for SSR flushing :)\n\n        if (this.context.report) {\n          this.context.report(chunkName);\n        }\n\n        if (Component || _utils.isServer) {\n          this.handleBefore(true, true, _utils.isServer);\n          this.update({ Component: Component }, true, true, _utils.isServer);\n          return;\n        }\n\n        this.handleBefore(true, false);\n        this.requireAsync(requireAsync, this.props, true);\n      }\n    }, {\n      key: 'componentWillUnmount',\n      value: function componentWillUnmount() {\n        this._mounted = false;\n      }\n    }, {\n      key: 'componentWillReceiveProps',\n      value: function componentWillReceiveProps(nextProps) {\n        var _this2 = this;\n\n        if (isDynamic || this._asyncOnly) {\n          var _req4 = (0, _requireUniversalModule2.default)(component, options, nextProps, this.props),\n              requireSync = _req4.requireSync,\n              requireAsync = _req4.requireAsync,\n              shouldUpdate = _req4.shouldUpdate;\n\n          if (shouldUpdate(nextProps, this.props)) {\n            var Component = void 0;\n\n            try {\n              Component = requireSync(nextProps, this.context);\n            } catch (error) {\n              return this.update({ error: error });\n            }\n\n            this.handleBefore(false, !!Component);\n\n            if (!Component) {\n              return this.requireAsync(requireAsync, nextProps);\n            }\n\n            var state = { Component: Component };\n\n            if (alwaysDelay) {\n              if (loadingTransition) this.update({ Component: null }); // display `loading` during componentWillReceiveProps\n              setTimeout(function () {\n                return _this2.update(state, false, true);\n              }, minDelay);\n              return;\n            }\n\n            this.update(state, false, true);\n          } else if (isHMR()) {\n            var _Component = requireSync(nextProps, this.context);\n            this.setState({ Component: function Component() {\n                return null;\n              } }); // HMR /w Redux and HOCs can be finicky, so we\n            setTimeout(function () {\n              return _this2.setState({ Component: _Component });\n            }); // toggle components to insure updates occur\n          }\n        }\n      }\n    }, {\n      key: 'requireAsync',\n      value: function requireAsync(_requireAsync, props, isMount) {\n        var _this3 = this;\n\n        if (this.state.Component && loadingTransition) {\n          this.update({ Component: null }); // display `loading` during componentWillReceiveProps\n        }\n\n        var time = new Date();\n\n        _requireAsync(props, this.context).then(function (Component) {\n          var state = { Component: Component };\n\n          var timeLapsed = new Date() - time;\n          if (timeLapsed < minDelay) {\n            var extraDelay = minDelay - timeLapsed;\n            return setTimeout(function () {\n              return _this3.update(state, isMount);\n            }, extraDelay);\n          }\n\n          _this3.update(state, isMount);\n        }).catch(function (error) {\n          return _this3.update({ error: error });\n        });\n      }\n    }, {\n      key: 'handleBefore',\n      value: function handleBefore(isMount, isSync) {\n        var isServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n        if (this.props.onBefore) {\n          var onBefore = this.props.onBefore;\n\n          var info = { isMount: isMount, isSync: isSync, isServer: isServer };\n          onBefore(info);\n        }\n      }\n    }, {\n      key: 'handleAfter',\n      value: function handleAfter(state, isMount, isSync, isServer) {\n        var Component = state.Component,\n            error = state.error;\n\n\n        if (Component && !error) {\n          (0, _hoistNonReactStatics2.default)(UniversalComponent, Component, {\n            preload: true,\n            preloadWeak: true\n          });\n\n          if (this.props.onAfter) {\n            var onAfter = this.props.onAfter;\n\n            var info = { isMount: isMount, isSync: isSync, isServer: isServer };\n            onAfter(info, Component);\n          }\n        } else if (error && this.props.onError) {\n          this.props.onError(error);\n        }\n\n        this.setState(state);\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        var _state = this.state,\n            error = _state.error,\n            Component = _state.Component;\n\n        var _props = this.props,\n            isLoading = _props.isLoading,\n            userError = _props.error,\n            props = _objectWithoutProperties(_props, ['isLoading', 'error']);\n\n        // user-provided props (e.g. for data-fetching loading):\n\n\n        if (isLoading) {\n          return (0, _utils.createElement)(Loading, props);\n        } else if (userError) {\n          return (0, _utils.createElement)(Err, _extends({}, props, { error: userError }));\n        } else if (error) {\n          return (0, _utils.createElement)(Err, _extends({}, props, { error: error }));\n        } else if (Component) {\n          // primary usage (for async import loading + errors):\n          return (0, _utils.createElement)(Component, props);\n        }\n\n        return (0, _utils.createElement)(Loading, props);\n      }\n    }]);\n\n    return UniversalComponent;\n  }(_react2.default.Component), _class.contextTypes = {\n    store: _propTypes2.default.object,\n    report: _propTypes2.default.func\n  }, _temp;\n}\nexports.default = universal;\n\n//# sourceURL=webpack:///./node_modules/react-universal-component/dist/index.js?");

/***/ }),

/***/ "./node_modules/react-universal-component/dist/report-chunks.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-universal-component/dist/report-chunks.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar ReportChunks = function (_React$Component) {\n  _inherits(ReportChunks, _React$Component);\n\n  function ReportChunks() {\n    _classCallCheck(this, ReportChunks);\n\n    return _possibleConstructorReturn(this, (ReportChunks.__proto__ || Object.getPrototypeOf(ReportChunks)).apply(this, arguments));\n  }\n\n  _createClass(ReportChunks, [{\n    key: 'getChildContext',\n    value: function getChildContext() {\n      return {\n        report: this.props.report\n      };\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return _react2.default.Children.only(this.props.children);\n    }\n  }]);\n\n  return ReportChunks;\n}(_react2.default.Component);\n\nReportChunks.propTypes = {\n  report: _propTypes2.default.func.isRequired\n};\nReportChunks.childContextTypes = {\n  report: _propTypes2.default.func.isRequired\n};\nexports.default = ReportChunks;\n\n//# sourceURL=webpack:///./node_modules/react-universal-component/dist/report-chunks.js?");

/***/ }),

/***/ "./node_modules/react-universal-component/dist/requireUniversalModule.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-universal-component/dist/requireUniversalModule.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.clearChunks = exports.flushModuleIds = exports.flushChunkNames = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;\nexports.default = requireUniversalModule;\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./node_modules/react-universal-component/dist/utils.js\");\n\nvar CHUNK_NAMES = exports.CHUNK_NAMES = new Set();\nvar MODULE_IDS = exports.MODULE_IDS = new Set();\n\nfunction requireUniversalModule(universalConfig, options, props, prevProps) {\n  var key = options.key,\n      _options$timeout = options.timeout,\n      timeout = _options$timeout === undefined ? 15000 : _options$timeout,\n      onLoad = options.onLoad,\n      onError = options.onError,\n      isDynamic = options.isDynamic,\n      modCache = options.modCache,\n      promCache = options.promCache,\n      usesBabelPlugin = options.usesBabelPlugin;\n\n\n  var config = getConfig(isDynamic, universalConfig, options, props);\n  var chunkName = config.chunkName,\n      path = config.path,\n      resolve = config.resolve,\n      load = config.load;\n\n  var asyncOnly = !path && !resolve || typeof chunkName === 'function';\n\n  var requireSync = function requireSync(props, context) {\n    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);\n\n    if (!exp) {\n      var mod = void 0;\n\n      if (!(0, _utils.isWebpack)() && path) {\n        var modulePath = (0, _utils.callForString)(path, props) || '';\n        mod = (0, _utils.tryRequire)(modulePath);\n      } else if ((0, _utils.isWebpack)() && resolve) {\n        var weakId = (0, _utils.callForString)(resolve, props);\n\n        if (__webpack_require__.m[weakId]) {\n          mod = (0, _utils.tryRequire)(weakId);\n        }\n      }\n\n      if (mod) {\n        exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache, true);\n      }\n    }\n\n    return exp;\n  };\n\n  var requireAsync = function requireAsync(props, context) {\n    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);\n    if (exp) return Promise.resolve(exp);\n\n    var cachedPromise = (0, _utils.loadFromPromiseCache)(chunkName, props, promCache);\n    if (cachedPromise) return cachedPromise;\n\n    var prom = new Promise(function (res, rej) {\n      var reject = function reject(error) {\n        error = error || new Error('timeout exceeded');\n        clearTimeout(timer);\n        if (onError) {\n          var _isServer = typeof window === 'undefined';\n          var info = { isServer: _isServer };\n          onError(error, info);\n        }\n        rej(error);\n      };\n\n      // const timer = timeout && setTimeout(reject, timeout)\n      var timer = timeout && setTimeout(reject, timeout);\n\n      var resolve = function resolve(mod) {\n        clearTimeout(timer);\n\n        var exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache);\n        if (exp) return res(exp);\n\n        reject(new Error('export not found'));\n      };\n\n      var request = load(props, { resolve: resolve, reject: reject });\n\n      // if load doesn't return a promise, it must call resolveImport\n      // itself. Most common is the promise implementation below.\n      if (!request || typeof request.then !== 'function') return;\n      request.then(resolve).catch(reject);\n    });\n\n    (0, _utils.cacheProm)(prom, chunkName, props, promCache);\n    return prom;\n  };\n\n  var addModule = function addModule(props) {\n    if (_utils.isServer || _utils.isTest) {\n      if (chunkName) {\n        var name = (0, _utils.callForString)(chunkName, props);\n        if (usesBabelPlugin) {\n          name = name.replace(/\\//g, '-');\n        }\n        if (name) CHUNK_NAMES.add(name);\n        if (!_utils.isTest) return name; // makes tests way smaller to run both kinds\n      }\n\n      if ((0, _utils.isWebpack)()) {\n        var weakId = (0, _utils.callForString)(resolve, props);\n        if (weakId) MODULE_IDS.add(weakId);\n        return weakId;\n      }\n\n      if (!(0, _utils.isWebpack)()) {\n        var modulePath = (0, _utils.callForString)(path, props);\n        if (modulePath) MODULE_IDS.add(modulePath);\n        return modulePath;\n      }\n    }\n  };\n\n  var shouldUpdate = function shouldUpdate(next, prev) {\n    var cacheKey = (0, _utils.callForString)(chunkName, next);\n\n    var config = getConfig(isDynamic, universalConfig, options, prev);\n    var prevCacheKey = (0, _utils.callForString)(config.chunkName, prev);\n\n    return cacheKey !== prevCacheKey;\n  };\n\n  return {\n    requireSync: requireSync,\n    requireAsync: requireAsync,\n    addModule: addModule,\n    shouldUpdate: shouldUpdate,\n    asyncOnly: asyncOnly\n  };\n}\n\nvar flushChunkNames = exports.flushChunkNames = function flushChunkNames() {\n  var chunks = Array.from(CHUNK_NAMES);\n  CHUNK_NAMES.clear();\n  return chunks;\n};\n\nvar flushModuleIds = exports.flushModuleIds = function flushModuleIds() {\n  var ids = Array.from(MODULE_IDS);\n  MODULE_IDS.clear();\n  return ids;\n};\n\nvar clearChunks = exports.clearChunks = function clearChunks() {\n  CHUNK_NAMES.clear();\n  MODULE_IDS.clear();\n};\n\nvar getConfig = function getConfig(isDynamic, universalConfig, options, props) {\n  if (isDynamic) {\n    return typeof universalConfig === 'function' ? universalConfig(props) : universalConfig;\n  }\n\n  var load = typeof universalConfig === 'function' ? universalConfig : // $FlowIssue\n  function () {\n    return universalConfig;\n  };\n\n  return {\n    file: 'default',\n    id: options.id || 'default',\n    chunkName: options.chunkName || 'default',\n    resolve: options.resolve || '',\n    path: options.path || '',\n    load: load\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/react-universal-component/dist/requireUniversalModule.js?");

/***/ }),

/***/ "./node_modules/react-universal-component/dist/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-universal-component/dist/utils.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.cacheProm = exports.loadFromPromiseCache = exports.cacheExport = exports.loadFromCache = exports.callForString = exports.createElement = exports.findExport = exports.resolveExport = exports.requireById = exports.tryRequire = exports.DefaultError = exports.DefaultLoading = exports.babelInterop = exports.isWebpack = exports.isServer = exports.isTest = undefined;\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar isTest = exports.isTest = \"development\" === 'test';\nvar isServer = exports.isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);\n\nvar isWebpack = exports.isWebpack = function isWebpack() {\n  return typeof __webpack_require__ !== 'undefined';\n};\nvar babelInterop = exports.babelInterop = function babelInterop(mod) {\n  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && mod.__esModule ? mod.default : mod;\n};\n\nvar DefaultLoading = exports.DefaultLoading = function DefaultLoading() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    'Loading...'\n  );\n};\nvar DefaultError = exports.DefaultError = function DefaultError(_ref) {\n  var error = _ref.error;\n  return _react2.default.createElement(\n    'div',\n    null,\n    'Error: ',\n    error && error.message\n  );\n};\n\nvar tryRequire = exports.tryRequire = function tryRequire(id) {\n  try {\n    return requireById(id);\n  } catch (err) {\n    // warn if there was an error while requiring the chunk during development\n    // this can sometimes lead the server to render the loading component.\n    if (true) {\n      console.warn('chunk not available for synchronous require yet: ' + id + ': ' + err.message, err.stack);\n    }\n  }\n\n  return null;\n};\n\nvar requireById = exports.requireById = function requireById(id) {\n  if (!isWebpack() && typeof id === 'string') {\n    return __webpack_require__(\"./node_modules/react-universal-component/dist sync recursive\")(id);\n  }\n\n  return __webpack_require__(id);\n};\n\nvar resolveExport = exports.resolveExport = function resolveExport(mod, key, onLoad, chunkName, props, context, modCache) {\n  var isSync = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;\n\n  var exp = findExport(mod, key);\n  if (onLoad && mod) {\n    var _isServer = typeof window === 'undefined';\n    var info = { isServer: _isServer, isSync: isSync };\n    onLoad(mod, info, props, context);\n  }\n  if (chunkName && exp) cacheExport(exp, chunkName, props, modCache);\n  return exp;\n};\n\nvar findExport = exports.findExport = function findExport(mod, key) {\n  if (typeof key === 'function') {\n    return key(mod);\n  } else if (key === null) {\n    return mod;\n  }\n\n  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && key ? mod[key] : babelInterop(mod);\n};\n\nvar createElement = exports.createElement = function createElement(Component, props) {\n  return _react2.default.isValidElement(Component) ? _react2.default.cloneElement(Component, props) : _react2.default.createElement(Component, props);\n};\n\nvar callForString = exports.callForString = function callForString(strFun, props) {\n  return typeof strFun === 'function' ? strFun(props) : strFun;\n};\n\nvar loadFromCache = exports.loadFromCache = function loadFromCache(chunkName, props, modCache) {\n  return !isServer && modCache[callForString(chunkName, props)];\n};\n\nvar cacheExport = exports.cacheExport = function cacheExport(exp, chunkName, props, modCache) {\n  return modCache[callForString(chunkName, props)] = exp;\n};\n\nvar loadFromPromiseCache = exports.loadFromPromiseCache = function loadFromPromiseCache(chunkName, props, promisecache) {\n  return promisecache[callForString(chunkName, props)];\n};\n\nvar cacheProm = exports.cacheProm = function cacheProm(pr, chunkName, props, promisecache) {\n  return promisecache[callForString(chunkName, props)] = pr;\n};\n\n//# sourceURL=webpack:///./node_modules/react-universal-component/dist/utils.js?");

/***/ }),

/***/ "./node_modules/react/index.js":
/*!**********************************************************************************************!*\
  !*** delegated ./node_modules/react/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(13);\n\n//# sourceURL=webpack:///delegated_./node_modules/react/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/redux-devtools-extension/logOnlyInProduction.js":
/*!*******************************************************************************************************************************!*\
  !*** delegated ./node_modules/redux-devtools-extension/logOnlyInProduction.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(426);\n\n//# sourceURL=webpack:///delegated_./node_modules/redux-devtools-extension/logOnlyInProduction.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/redux-first-router-link/dist/index.js":
/*!*********************************************************************************************************************!*\
  !*** delegated ./node_modules/redux-first-router-link/dist/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(220);\n\n//# sourceURL=webpack:///delegated_./node_modules/redux-first-router-link/dist/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/redux-first-router/dist/index.js":
/*!****************************************************************************************************************!*\
  !*** delegated ./node_modules/redux-first-router/dist/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(14);\n\n//# sourceURL=webpack:///delegated_./node_modules/redux-first-router/dist/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/redux/es/redux.js":
/*!*************************************************************************************************!*\
  !*** delegated ./node_modules/redux/es/redux.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*************************************************************************************************/
/*! exports provided: createStore, combineReducers, bindActionCreators, applyMiddleware, compose, __DO_NOT_USE__ActionTypes */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(47);\n\n//# sourceURL=webpack:///delegated_./node_modules/redux/es/redux.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!**************************************************************************************************************!*\
  !*** delegated ./node_modules/regenerator-runtime/runtime.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(425);\n\n//# sourceURL=webpack:///delegated_./node_modules/regenerator-runtime/runtime.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/reselect/es/index.js":
/*!*******************************************!*\
  !*** ./node_modules/reselect/es/index.js ***!
  \*******************************************/
/*! exports provided: defaultMemoize, createSelectorCreator, createSelector, createStructuredSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultMemoize\", function() { return defaultMemoize; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSelectorCreator\", function() { return createSelectorCreator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createSelector\", function() { return createSelector; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createStructuredSelector\", function() { return createStructuredSelector; });\nfunction defaultEqualityCheck(a, b) {\n  return a === b;\n}\n\nfunction areArgumentsShallowlyEqual(equalityCheck, prev, next) {\n  if (prev === null || next === null || prev.length !== next.length) {\n    return false;\n  }\n\n  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.\n  var length = prev.length;\n  for (var i = 0; i < length; i++) {\n    if (!equalityCheck(prev[i], next[i])) {\n      return false;\n    }\n  }\n\n  return true;\n}\n\nfunction defaultMemoize(func) {\n  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;\n\n  var lastArgs = null;\n  var lastResult = null;\n  // we reference arguments instead of spreading them for performance reasons\n  return function () {\n    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {\n      // apply arguments instead of spreading for performance.\n      lastResult = func.apply(null, arguments);\n    }\n\n    lastArgs = arguments;\n    return lastResult;\n  };\n}\n\nfunction getDependencies(funcs) {\n  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;\n\n  if (!dependencies.every(function (dep) {\n    return typeof dep === 'function';\n  })) {\n    var dependencyTypes = dependencies.map(function (dep) {\n      return typeof dep;\n    }).join(', ');\n    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));\n  }\n\n  return dependencies;\n}\n\nfunction createSelectorCreator(memoize) {\n  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    memoizeOptions[_key - 1] = arguments[_key];\n  }\n\n  return function () {\n    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n      funcs[_key2] = arguments[_key2];\n    }\n\n    var recomputations = 0;\n    var resultFunc = funcs.pop();\n    var dependencies = getDependencies(funcs);\n\n    var memoizedResultFunc = memoize.apply(undefined, [function () {\n      recomputations++;\n      // apply arguments instead of spreading for performance.\n      return resultFunc.apply(null, arguments);\n    }].concat(memoizeOptions));\n\n    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.\n    var selector = memoize(function () {\n      var params = [];\n      var length = dependencies.length;\n\n      for (var i = 0; i < length; i++) {\n        // apply arguments instead of spreading and mutate a local list of params for performance.\n        params.push(dependencies[i].apply(null, arguments));\n      }\n\n      // apply arguments instead of spreading for performance.\n      return memoizedResultFunc.apply(null, params);\n    });\n\n    selector.resultFunc = resultFunc;\n    selector.dependencies = dependencies;\n    selector.recomputations = function () {\n      return recomputations;\n    };\n    selector.resetRecomputations = function () {\n      return recomputations = 0;\n    };\n    return selector;\n  };\n}\n\nvar createSelector = createSelectorCreator(defaultMemoize);\n\nfunction createStructuredSelector(selectors) {\n  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;\n\n  if (typeof selectors !== 'object') {\n    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));\n  }\n  var objectKeys = Object.keys(selectors);\n  return selectorCreator(objectKeys.map(function (key) {\n    return selectors[key];\n  }), function () {\n    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {\n      values[_key3] = arguments[_key3];\n    }\n\n    return values.reduce(function (composition, value, index) {\n      composition[objectKeys[index]] = value;\n      return composition;\n    }, {});\n  });\n}\n\n//# sourceURL=webpack:///./node_modules/reselect/es/index.js?");

/***/ }),

/***/ "./node_modules/shallowequal/index.js":
/*!********************************************!*\
  !*** ./node_modules/shallowequal/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//\n\nmodule.exports = function shallowEqual(objA, objB, compare, compareContext) {\n  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;\n\n  if (ret !== void 0) {\n    return !!ret;\n  }\n\n  if (objA === objB) {\n    return true;\n  }\n\n  if (typeof objA !== \"object\" || !objA || typeof objB !== \"object\" || !objB) {\n    return false;\n  }\n\n  var keysA = Object.keys(objA);\n  var keysB = Object.keys(objB);\n\n  if (keysA.length !== keysB.length) {\n    return false;\n  }\n\n  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);\n\n  // Test for A's keys different from B.\n  for (var idx = 0; idx < keysA.length; idx++) {\n    var key = keysA[idx];\n\n    if (!bHasOwnProperty(key)) {\n      return false;\n    }\n\n    var valueA = objA[key];\n    var valueB = objB[key];\n\n    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;\n\n    if (ret === false || (ret === void 0 && valueA !== valueB)) {\n      return false;\n    }\n  }\n\n  return true;\n};\n\n\n//# sourceURL=webpack:///./node_modules/shallowequal/index.js?");

/***/ }),

/***/ "./node_modules/sort-keys/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sort-keys/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar isPlainObj = __webpack_require__(/*! is-plain-obj */ \"./node_modules/is-plain-obj/index.js\");\n\nmodule.exports = function (obj, opts) {\n\tif (!isPlainObj(obj)) {\n\t\tthrow new TypeError('Expected a plain object');\n\t}\n\n\topts = opts || {};\n\n\t// DEPRECATED\n\tif (typeof opts === 'function') {\n\t\topts = {compare: opts};\n\t}\n\n\tvar deep = opts.deep;\n\tvar seenInput = [];\n\tvar seenOutput = [];\n\n\tvar sortKeys = function (x) {\n\t\tvar seenIndex = seenInput.indexOf(x);\n\n\t\tif (seenIndex !== -1) {\n\t\t\treturn seenOutput[seenIndex];\n\t\t}\n\n\t\tvar ret = {};\n\t\tvar keys = Object.keys(x).sort(opts.compare);\n\n\t\tseenInput.push(x);\n\t\tseenOutput.push(ret);\n\n\t\tfor (var i = 0; i < keys.length; i++) {\n\t\t\tvar key = keys[i];\n\t\t\tvar val = x[key];\n\n\t\t\tret[key] = deep && isPlainObj(val) ? sortKeys(val) : val;\n\t\t}\n\n\t\treturn ret;\n\t};\n\n\treturn sortKeys(obj);\n};\n\n\n//# sourceURL=webpack:///./node_modules/sort-keys/index.js?");

/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = function (str) {\n\treturn encodeURIComponent(str).replace(/[!'()*]/g, function (c) {\n\t\treturn '%' + c.charCodeAt(0).toString(16).toUpperCase();\n\t});\n};\n\n\n//# sourceURL=webpack:///./node_modules/strict-uri-encode/index.js?");

/***/ }),

/***/ "./node_modules/strip-ansi/index.js":
/*!******************************************!*\
  !*** ./node_modules/strip-ansi/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar ansiRegex = __webpack_require__(/*! ansi-regex */ \"./node_modules/ansi-regex/index.js\")();\n\nmodule.exports = function (str) {\n\treturn typeof str === 'string' ? str.replace(ansiRegex, '') : str;\n};\n\n\n//# sourceURL=webpack:///./node_modules/strip-ansi/index.js?");

/***/ }),

/***/ "./node_modules/transition-group/dist/index.js":
/*!**************************************************************************************************************!*\
  !*** delegated ./node_modules/transition-group/dist/index.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(197);\n\n//# sourceURL=webpack:///delegated_./node_modules/transition-group/dist/index.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar punycode = __webpack_require__(/*! punycode */ \"./node_modules/node-libs-browser/node_modules/punycode/punycode.js\");\nvar util = __webpack_require__(/*! ./util */ \"./node_modules/url/util.js\");\n\nexports.parse = urlParse;\nexports.resolve = urlResolve;\nexports.resolveObject = urlResolveObject;\nexports.format = urlFormat;\n\nexports.Url = Url;\n\nfunction Url() {\n  this.protocol = null;\n  this.slashes = null;\n  this.auth = null;\n  this.host = null;\n  this.port = null;\n  this.hostname = null;\n  this.hash = null;\n  this.search = null;\n  this.query = null;\n  this.pathname = null;\n  this.path = null;\n  this.href = null;\n}\n\n// Reference: RFC 3986, RFC 1808, RFC 2396\n\n// define these here so at least they only have to be\n// compiled once on the first module load.\nvar protocolPattern = /^([a-z0-9.+-]+:)/i,\n    portPattern = /:[0-9]*$/,\n\n    // Special case for a simple path URL\n    simplePathPattern = /^(\\/\\/?(?!\\/)[^\\?\\s]*)(\\?[^\\s]*)?$/,\n\n    // RFC 2396: characters reserved for delimiting URLs.\n    // We actually just auto-escape these.\n    delims = ['<', '>', '\"', '`', ' ', '\\r', '\\n', '\\t'],\n\n    // RFC 2396: characters not allowed for various reasons.\n    unwise = ['{', '}', '|', '\\\\', '^', '`'].concat(delims),\n\n    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.\n    autoEscape = ['\\''].concat(unwise),\n    // Characters that are never ever allowed in a hostname.\n    // Note that any invalid chars are also handled, but these\n    // are the ones that are *expected* to be seen, so we fast-path\n    // them.\n    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),\n    hostEndingChars = ['/', '?', '#'],\n    hostnameMaxLen = 255,\n    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,\n    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,\n    // protocols that can allow \"unsafe\" and \"unwise\" chars.\n    unsafeProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that never have a hostname.\n    hostlessProtocol = {\n      'javascript': true,\n      'javascript:': true\n    },\n    // protocols that always contain a // bit.\n    slashedProtocol = {\n      'http': true,\n      'https': true,\n      'ftp': true,\n      'gopher': true,\n      'file': true,\n      'http:': true,\n      'https:': true,\n      'ftp:': true,\n      'gopher:': true,\n      'file:': true\n    },\n    querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring-es3/index.js\");\n\nfunction urlParse(url, parseQueryString, slashesDenoteHost) {\n  if (url && util.isObject(url) && url instanceof Url) return url;\n\n  var u = new Url;\n  u.parse(url, parseQueryString, slashesDenoteHost);\n  return u;\n}\n\nUrl.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {\n  if (!util.isString(url)) {\n    throw new TypeError(\"Parameter 'url' must be a string, not \" + typeof url);\n  }\n\n  // Copy chrome, IE, opera backslash-handling behavior.\n  // Back slashes before the query string get converted to forward slashes\n  // See: https://code.google.com/p/chromium/issues/detail?id=25916\n  var queryIndex = url.indexOf('?'),\n      splitter =\n          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',\n      uSplit = url.split(splitter),\n      slashRegex = /\\\\/g;\n  uSplit[0] = uSplit[0].replace(slashRegex, '/');\n  url = uSplit.join(splitter);\n\n  var rest = url;\n\n  // trim before proceeding.\n  // This is to support parse stuff like \"  http://foo.com  \\n\"\n  rest = rest.trim();\n\n  if (!slashesDenoteHost && url.split('#').length === 1) {\n    // Try fast path regexp\n    var simplePath = simplePathPattern.exec(rest);\n    if (simplePath) {\n      this.path = rest;\n      this.href = rest;\n      this.pathname = simplePath[1];\n      if (simplePath[2]) {\n        this.search = simplePath[2];\n        if (parseQueryString) {\n          this.query = querystring.parse(this.search.substr(1));\n        } else {\n          this.query = this.search.substr(1);\n        }\n      } else if (parseQueryString) {\n        this.search = '';\n        this.query = {};\n      }\n      return this;\n    }\n  }\n\n  var proto = protocolPattern.exec(rest);\n  if (proto) {\n    proto = proto[0];\n    var lowerProto = proto.toLowerCase();\n    this.protocol = lowerProto;\n    rest = rest.substr(proto.length);\n  }\n\n  // figure out if it's got a host\n  // user@server is *always* interpreted as a hostname, and url\n  // resolution will treat //foo/bar as host=foo,path=bar because that's\n  // how the browser resolves relative URLs.\n  if (slashesDenoteHost || proto || rest.match(/^\\/\\/[^@\\/]+@[^@\\/]+/)) {\n    var slashes = rest.substr(0, 2) === '//';\n    if (slashes && !(proto && hostlessProtocol[proto])) {\n      rest = rest.substr(2);\n      this.slashes = true;\n    }\n  }\n\n  if (!hostlessProtocol[proto] &&\n      (slashes || (proto && !slashedProtocol[proto]))) {\n\n    // there's a hostname.\n    // the first instance of /, ?, ;, or # ends the host.\n    //\n    // If there is an @ in the hostname, then non-host chars *are* allowed\n    // to the left of the last @ sign, unless some host-ending character\n    // comes *before* the @-sign.\n    // URLs are obnoxious.\n    //\n    // ex:\n    // http://a@b@c/ => user:a@b host:c\n    // http://a@b?@c => user:a host:c path:/?@c\n\n    // v0.12 TODO(isaacs): This is not quite how Chrome does things.\n    // Review our test case against browsers more comprehensively.\n\n    // find the first instance of any hostEndingChars\n    var hostEnd = -1;\n    for (var i = 0; i < hostEndingChars.length; i++) {\n      var hec = rest.indexOf(hostEndingChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n\n    // at this point, either we have an explicit point where the\n    // auth portion cannot go past, or the last @ char is the decider.\n    var auth, atSign;\n    if (hostEnd === -1) {\n      // atSign can be anywhere.\n      atSign = rest.lastIndexOf('@');\n    } else {\n      // atSign must be in auth portion.\n      // http://a@b/c@d => host:b auth:a path:/c@d\n      atSign = rest.lastIndexOf('@', hostEnd);\n    }\n\n    // Now we have a portion which is definitely the auth.\n    // Pull that off.\n    if (atSign !== -1) {\n      auth = rest.slice(0, atSign);\n      rest = rest.slice(atSign + 1);\n      this.auth = decodeURIComponent(auth);\n    }\n\n    // the host is the remaining to the left of the first non-host char\n    hostEnd = -1;\n    for (var i = 0; i < nonHostChars.length; i++) {\n      var hec = rest.indexOf(nonHostChars[i]);\n      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))\n        hostEnd = hec;\n    }\n    // if we still have not hit it, then the entire thing is a host.\n    if (hostEnd === -1)\n      hostEnd = rest.length;\n\n    this.host = rest.slice(0, hostEnd);\n    rest = rest.slice(hostEnd);\n\n    // pull out port.\n    this.parseHost();\n\n    // we've indicated that there is a hostname,\n    // so even if it's empty, it has to be present.\n    this.hostname = this.hostname || '';\n\n    // if hostname begins with [ and ends with ]\n    // assume that it's an IPv6 address.\n    var ipv6Hostname = this.hostname[0] === '[' &&\n        this.hostname[this.hostname.length - 1] === ']';\n\n    // validate a little.\n    if (!ipv6Hostname) {\n      var hostparts = this.hostname.split(/\\./);\n      for (var i = 0, l = hostparts.length; i < l; i++) {\n        var part = hostparts[i];\n        if (!part) continue;\n        if (!part.match(hostnamePartPattern)) {\n          var newpart = '';\n          for (var j = 0, k = part.length; j < k; j++) {\n            if (part.charCodeAt(j) > 127) {\n              // we replace non-ASCII char with a temporary placeholder\n              // we need this to make sure size of hostname is not\n              // broken by replacing non-ASCII by nothing\n              newpart += 'x';\n            } else {\n              newpart += part[j];\n            }\n          }\n          // we test again with ASCII char only\n          if (!newpart.match(hostnamePartPattern)) {\n            var validParts = hostparts.slice(0, i);\n            var notHost = hostparts.slice(i + 1);\n            var bit = part.match(hostnamePartStart);\n            if (bit) {\n              validParts.push(bit[1]);\n              notHost.unshift(bit[2]);\n            }\n            if (notHost.length) {\n              rest = '/' + notHost.join('.') + rest;\n            }\n            this.hostname = validParts.join('.');\n            break;\n          }\n        }\n      }\n    }\n\n    if (this.hostname.length > hostnameMaxLen) {\n      this.hostname = '';\n    } else {\n      // hostnames are always lower case.\n      this.hostname = this.hostname.toLowerCase();\n    }\n\n    if (!ipv6Hostname) {\n      // IDNA Support: Returns a punycoded representation of \"domain\".\n      // It only converts parts of the domain name that\n      // have non-ASCII characters, i.e. it doesn't matter if\n      // you call it with a domain that already is ASCII-only.\n      this.hostname = punycode.toASCII(this.hostname);\n    }\n\n    var p = this.port ? ':' + this.port : '';\n    var h = this.hostname || '';\n    this.host = h + p;\n    this.href += this.host;\n\n    // strip [ and ] from the hostname\n    // the host field still retains them, though\n    if (ipv6Hostname) {\n      this.hostname = this.hostname.substr(1, this.hostname.length - 2);\n      if (rest[0] !== '/') {\n        rest = '/' + rest;\n      }\n    }\n  }\n\n  // now rest is set to the post-host stuff.\n  // chop off any delim chars.\n  if (!unsafeProtocol[lowerProto]) {\n\n    // First, make 100% sure that any \"autoEscape\" chars get\n    // escaped, even if encodeURIComponent doesn't think they\n    // need to be.\n    for (var i = 0, l = autoEscape.length; i < l; i++) {\n      var ae = autoEscape[i];\n      if (rest.indexOf(ae) === -1)\n        continue;\n      var esc = encodeURIComponent(ae);\n      if (esc === ae) {\n        esc = escape(ae);\n      }\n      rest = rest.split(ae).join(esc);\n    }\n  }\n\n\n  // chop off from the tail first.\n  var hash = rest.indexOf('#');\n  if (hash !== -1) {\n    // got a fragment string.\n    this.hash = rest.substr(hash);\n    rest = rest.slice(0, hash);\n  }\n  var qm = rest.indexOf('?');\n  if (qm !== -1) {\n    this.search = rest.substr(qm);\n    this.query = rest.substr(qm + 1);\n    if (parseQueryString) {\n      this.query = querystring.parse(this.query);\n    }\n    rest = rest.slice(0, qm);\n  } else if (parseQueryString) {\n    // no query string, but parseQueryString still requested\n    this.search = '';\n    this.query = {};\n  }\n  if (rest) this.pathname = rest;\n  if (slashedProtocol[lowerProto] &&\n      this.hostname && !this.pathname) {\n    this.pathname = '/';\n  }\n\n  //to support http.request\n  if (this.pathname || this.search) {\n    var p = this.pathname || '';\n    var s = this.search || '';\n    this.path = p + s;\n  }\n\n  // finally, reconstruct the href based on what has been validated.\n  this.href = this.format();\n  return this;\n};\n\n// format a parsed object into a url string\nfunction urlFormat(obj) {\n  // ensure it's an object, and not a string url.\n  // If it's an obj, this is a no-op.\n  // this way, you can call url_format() on strings\n  // to clean up potentially wonky urls.\n  if (util.isString(obj)) obj = urlParse(obj);\n  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);\n  return obj.format();\n}\n\nUrl.prototype.format = function() {\n  var auth = this.auth || '';\n  if (auth) {\n    auth = encodeURIComponent(auth);\n    auth = auth.replace(/%3A/i, ':');\n    auth += '@';\n  }\n\n  var protocol = this.protocol || '',\n      pathname = this.pathname || '',\n      hash = this.hash || '',\n      host = false,\n      query = '';\n\n  if (this.host) {\n    host = auth + this.host;\n  } else if (this.hostname) {\n    host = auth + (this.hostname.indexOf(':') === -1 ?\n        this.hostname :\n        '[' + this.hostname + ']');\n    if (this.port) {\n      host += ':' + this.port;\n    }\n  }\n\n  if (this.query &&\n      util.isObject(this.query) &&\n      Object.keys(this.query).length) {\n    query = querystring.stringify(this.query);\n  }\n\n  var search = this.search || (query && ('?' + query)) || '';\n\n  if (protocol && protocol.substr(-1) !== ':') protocol += ':';\n\n  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.\n  // unless they had them to begin with.\n  if (this.slashes ||\n      (!protocol || slashedProtocol[protocol]) && host !== false) {\n    host = '//' + (host || '');\n    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;\n  } else if (!host) {\n    host = '';\n  }\n\n  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;\n  if (search && search.charAt(0) !== '?') search = '?' + search;\n\n  pathname = pathname.replace(/[?#]/g, function(match) {\n    return encodeURIComponent(match);\n  });\n  search = search.replace('#', '%23');\n\n  return protocol + host + pathname + search + hash;\n};\n\nfunction urlResolve(source, relative) {\n  return urlParse(source, false, true).resolve(relative);\n}\n\nUrl.prototype.resolve = function(relative) {\n  return this.resolveObject(urlParse(relative, false, true)).format();\n};\n\nfunction urlResolveObject(source, relative) {\n  if (!source) return relative;\n  return urlParse(source, false, true).resolveObject(relative);\n}\n\nUrl.prototype.resolveObject = function(relative) {\n  if (util.isString(relative)) {\n    var rel = new Url();\n    rel.parse(relative, false, true);\n    relative = rel;\n  }\n\n  var result = new Url();\n  var tkeys = Object.keys(this);\n  for (var tk = 0; tk < tkeys.length; tk++) {\n    var tkey = tkeys[tk];\n    result[tkey] = this[tkey];\n  }\n\n  // hash is always overridden, no matter what.\n  // even href=\"\" will remove it.\n  result.hash = relative.hash;\n\n  // if the relative url is empty, then there's nothing left to do here.\n  if (relative.href === '') {\n    result.href = result.format();\n    return result;\n  }\n\n  // hrefs like //foo/bar always cut to the protocol.\n  if (relative.slashes && !relative.protocol) {\n    // take everything except the protocol from relative\n    var rkeys = Object.keys(relative);\n    for (var rk = 0; rk < rkeys.length; rk++) {\n      var rkey = rkeys[rk];\n      if (rkey !== 'protocol')\n        result[rkey] = relative[rkey];\n    }\n\n    //urlParse appends trailing / to urls like http://www.example.com\n    if (slashedProtocol[result.protocol] &&\n        result.hostname && !result.pathname) {\n      result.path = result.pathname = '/';\n    }\n\n    result.href = result.format();\n    return result;\n  }\n\n  if (relative.protocol && relative.protocol !== result.protocol) {\n    // if it's a known url protocol, then changing\n    // the protocol does weird things\n    // first, if it's not file:, then we MUST have a host,\n    // and if there was a path\n    // to begin with, then we MUST have a path.\n    // if it is file:, then the host is dropped,\n    // because that's known to be hostless.\n    // anything else is assumed to be absolute.\n    if (!slashedProtocol[relative.protocol]) {\n      var keys = Object.keys(relative);\n      for (var v = 0; v < keys.length; v++) {\n        var k = keys[v];\n        result[k] = relative[k];\n      }\n      result.href = result.format();\n      return result;\n    }\n\n    result.protocol = relative.protocol;\n    if (!relative.host && !hostlessProtocol[relative.protocol]) {\n      var relPath = (relative.pathname || '').split('/');\n      while (relPath.length && !(relative.host = relPath.shift()));\n      if (!relative.host) relative.host = '';\n      if (!relative.hostname) relative.hostname = '';\n      if (relPath[0] !== '') relPath.unshift('');\n      if (relPath.length < 2) relPath.unshift('');\n      result.pathname = relPath.join('/');\n    } else {\n      result.pathname = relative.pathname;\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    result.host = relative.host || '';\n    result.auth = relative.auth;\n    result.hostname = relative.hostname || relative.host;\n    result.port = relative.port;\n    // to support http.request\n    if (result.pathname || result.search) {\n      var p = result.pathname || '';\n      var s = result.search || '';\n      result.path = p + s;\n    }\n    result.slashes = result.slashes || relative.slashes;\n    result.href = result.format();\n    return result;\n  }\n\n  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),\n      isRelAbs = (\n          relative.host ||\n          relative.pathname && relative.pathname.charAt(0) === '/'\n      ),\n      mustEndAbs = (isRelAbs || isSourceAbs ||\n                    (result.host && relative.pathname)),\n      removeAllDots = mustEndAbs,\n      srcPath = result.pathname && result.pathname.split('/') || [],\n      relPath = relative.pathname && relative.pathname.split('/') || [],\n      psychotic = result.protocol && !slashedProtocol[result.protocol];\n\n  // if the url is a non-slashed url, then relative\n  // links like ../.. should be able\n  // to crawl up to the hostname, as well.  This is strange.\n  // result.protocol has already been set by now.\n  // Later on, put the first path part into the host field.\n  if (psychotic) {\n    result.hostname = '';\n    result.port = null;\n    if (result.host) {\n      if (srcPath[0] === '') srcPath[0] = result.host;\n      else srcPath.unshift(result.host);\n    }\n    result.host = '';\n    if (relative.protocol) {\n      relative.hostname = null;\n      relative.port = null;\n      if (relative.host) {\n        if (relPath[0] === '') relPath[0] = relative.host;\n        else relPath.unshift(relative.host);\n      }\n      relative.host = null;\n    }\n    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');\n  }\n\n  if (isRelAbs) {\n    // it's absolute.\n    result.host = (relative.host || relative.host === '') ?\n                  relative.host : result.host;\n    result.hostname = (relative.hostname || relative.hostname === '') ?\n                      relative.hostname : result.hostname;\n    result.search = relative.search;\n    result.query = relative.query;\n    srcPath = relPath;\n    // fall through to the dot-handling below.\n  } else if (relPath.length) {\n    // it's relative\n    // throw away the existing file, and take the new path instead.\n    if (!srcPath) srcPath = [];\n    srcPath.pop();\n    srcPath = srcPath.concat(relPath);\n    result.search = relative.search;\n    result.query = relative.query;\n  } else if (!util.isNullOrUndefined(relative.search)) {\n    // just pull out the search.\n    // like href='?foo'.\n    // Put this after the other two cases because it simplifies the booleans\n    if (psychotic) {\n      result.hostname = result.host = srcPath.shift();\n      //occationaly the auth can get stuck only in host\n      //this especially happens in cases like\n      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n      var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                       result.host.split('@') : false;\n      if (authInHost) {\n        result.auth = authInHost.shift();\n        result.host = result.hostname = authInHost.shift();\n      }\n    }\n    result.search = relative.search;\n    result.query = relative.query;\n    //to support http.request\n    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n      result.path = (result.pathname ? result.pathname : '') +\n                    (result.search ? result.search : '');\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  if (!srcPath.length) {\n    // no path at all.  easy.\n    // we've already handled the other stuff above.\n    result.pathname = null;\n    //to support http.request\n    if (result.search) {\n      result.path = '/' + result.search;\n    } else {\n      result.path = null;\n    }\n    result.href = result.format();\n    return result;\n  }\n\n  // if a url ENDs in . or .., then it must get a trailing slash.\n  // however, if it ends in anything else non-slashy,\n  // then it must NOT get a trailing slash.\n  var last = srcPath.slice(-1)[0];\n  var hasTrailingSlash = (\n      (result.host || relative.host || srcPath.length > 1) &&\n      (last === '.' || last === '..') || last === '');\n\n  // strip single dots, resolve double dots to parent dir\n  // if the path tries to go above the root, `up` ends up > 0\n  var up = 0;\n  for (var i = srcPath.length; i >= 0; i--) {\n    last = srcPath[i];\n    if (last === '.') {\n      srcPath.splice(i, 1);\n    } else if (last === '..') {\n      srcPath.splice(i, 1);\n      up++;\n    } else if (up) {\n      srcPath.splice(i, 1);\n      up--;\n    }\n  }\n\n  // if the path is allowed to go above the root, restore leading ..s\n  if (!mustEndAbs && !removeAllDots) {\n    for (; up--; up) {\n      srcPath.unshift('..');\n    }\n  }\n\n  if (mustEndAbs && srcPath[0] !== '' &&\n      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {\n    srcPath.unshift('');\n  }\n\n  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {\n    srcPath.push('');\n  }\n\n  var isAbsolute = srcPath[0] === '' ||\n      (srcPath[0] && srcPath[0].charAt(0) === '/');\n\n  // put the host back\n  if (psychotic) {\n    result.hostname = result.host = isAbsolute ? '' :\n                                    srcPath.length ? srcPath.shift() : '';\n    //occationaly the auth can get stuck only in host\n    //this especially happens in cases like\n    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')\n    var authInHost = result.host && result.host.indexOf('@') > 0 ?\n                     result.host.split('@') : false;\n    if (authInHost) {\n      result.auth = authInHost.shift();\n      result.host = result.hostname = authInHost.shift();\n    }\n  }\n\n  mustEndAbs = mustEndAbs || (result.host && srcPath.length);\n\n  if (mustEndAbs && !isAbsolute) {\n    srcPath.unshift('');\n  }\n\n  if (!srcPath.length) {\n    result.pathname = null;\n    result.path = null;\n  } else {\n    result.pathname = srcPath.join('/');\n  }\n\n  //to support request.http\n  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {\n    result.path = (result.pathname ? result.pathname : '') +\n                  (result.search ? result.search : '');\n  }\n  result.auth = relative.auth || result.auth;\n  result.slashes = result.slashes || relative.slashes;\n  result.href = result.format();\n  return result;\n};\n\nUrl.prototype.parseHost = function() {\n  var host = this.host;\n  var port = portPattern.exec(host);\n  if (port) {\n    port = port[0];\n    if (port !== ':') {\n      this.port = port.substr(1);\n    }\n    host = host.substr(0, host.length - port.length);\n  }\n  if (host) this.hostname = host;\n};\n\n\n//# sourceURL=webpack:///./node_modules/url/url.js?");

/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = {\n  isString: function(arg) {\n    return typeof(arg) === 'string';\n  },\n  isObject: function(arg) {\n    return typeof(arg) === 'object' && arg !== null;\n  },\n  isNull: function(arg) {\n    return arg === null;\n  },\n  isNullOrUndefined: function(arg) {\n    return arg == null;\n  }\n};\n\n\n//# sourceURL=webpack:///./node_modules/url/util.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client-overlay.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/client-overlay.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*eslint-env browser*/\n\nvar clientOverlay = document.createElement('div');\nclientOverlay.id = 'webpack-hot-middleware-clientOverlay';\nvar styles = {\n  background: 'rgba(0,0,0,0.85)',\n  color: '#E8E8E8',\n  lineHeight: '1.2',\n  whiteSpace: 'pre',\n  fontFamily: 'Menlo, Consolas, monospace',\n  fontSize: '13px',\n  position: 'fixed',\n  zIndex: 9999,\n  padding: '10px',\n  left: 0,\n  right: 0,\n  top: 0,\n  bottom: 0,\n  overflow: 'auto',\n  dir: 'ltr',\n  textAlign: 'left'\n};\n\nvar ansiHTML = __webpack_require__(/*! ansi-html */ \"./node_modules/ansi-html/index.js\");\nvar colors = {\n  reset: ['transparent', 'transparent'],\n  black: '181818',\n  red: 'E36049',\n  green: 'B3CB74',\n  yellow: 'FFD080',\n  blue: '7CAFC2',\n  magenta: '7FACCA',\n  cyan: 'C3C2EF',\n  lightgrey: 'EBE7E3',\n  darkgrey: '6D7891'\n};\n\nvar Entities = __webpack_require__(/*! html-entities */ \"./node_modules/html-entities/index.js\").AllHtmlEntities;\nvar entities = new Entities();\n\nfunction showProblems(type, lines) {\n  clientOverlay.innerHTML = '';\n  lines.forEach(function(msg) {\n    msg = ansiHTML(entities.encode(msg));\n    var div = document.createElement('div');\n    div.style.marginBottom = '26px';\n    div.innerHTML = problemType(type) + ' in ' + msg;\n    clientOverlay.appendChild(div);\n  });\n  if (document.body) {\n    document.body.appendChild(clientOverlay);\n  }\n}\n\nfunction clear() {\n  if (document.body && clientOverlay.parentNode) {\n    document.body.removeChild(clientOverlay);\n  }\n}\n\nfunction problemType (type) {\n  var problemColors = {\n    errors: colors.red,\n    warnings: colors.yellow\n  };\n  var color = problemColors[type] || colors.red;\n  return (\n    '<span style=\"background-color:#' + color + '; color:#fff; padding:2px 4px; border-radius: 2px\">' +\n      type.slice(0, -1).toUpperCase() +\n    '</span>'\n  );\n}\n\nmodule.exports = function(options) {\n  for (var color in options.overlayColors) {\n    if (color in colors) {\n      colors[color] = options.overlayColors[color];\n    }\n    ansiHTML.setColors(colors);\n  }\n\n  for (var style in options.overlayStyles) {\n    styles[style] = options.overlayStyles[style];\n  }\n\n  for (var key in styles) {\n    clientOverlay.style[key] = styles[key];\n  }\n\n  return {\n    showProblems: showProblems,\n    clear: clear\n  }\n};\n\nmodule.exports.clear = clear;\nmodule.exports.showProblems = showProblems;\n\n\n//# sourceURL=webpack:///(webpack)-hot-middleware/client-overlay.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false":
/*!******************************************************************************************************************!*\
  !*** (webpack)-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery, module) {/*eslint-env browser*/\n/*global __resourceQuery __webpack_public_path__*/\n\nvar options = {\n  path: \"/__webpack_hmr\",\n  timeout: 20 * 1000,\n  overlay: true,\n  reload: false,\n  log: true,\n  warn: true,\n  name: '',\n  autoConnect: true,\n  overlayStyles: {},\n  overlayWarnings: false,\n  ansiColors: {}\n};\nif (true) {\n  var querystring = __webpack_require__(/*! querystring */ \"./node_modules/querystring-es3/index.js\");\n  var overrides = querystring.parse(__resourceQuery.slice(1));\n  setOverrides(overrides);\n}\n\nif (typeof window === 'undefined') {\n  // do nothing\n} else if (typeof window.EventSource === 'undefined') {\n  console.warn(\n    \"webpack-hot-middleware's client requires EventSource to work. \" +\n    \"You should include a polyfill if you want to support this browser: \" +\n    \"https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools\"\n  );\n} else {\n  if (options.autoConnect) {\n    connect();\n  }\n}\n\n/* istanbul ignore next */\nfunction setOptionsAndConnect(overrides) {\n  setOverrides(overrides);\n  connect();\n}\n\nfunction setOverrides(overrides) {\n  if (overrides.autoConnect) options.autoConnect = overrides.autoConnect == 'true';\n  if (overrides.path) options.path = overrides.path;\n  if (overrides.timeout) options.timeout = overrides.timeout;\n  if (overrides.overlay) options.overlay = overrides.overlay !== 'false';\n  if (overrides.reload) options.reload = overrides.reload !== 'false';\n  if (overrides.noInfo && overrides.noInfo !== 'false') {\n    options.log = false;\n  }\n  if (overrides.name) {\n    options.name = overrides.name;\n  }\n  if (overrides.quiet && overrides.quiet !== 'false') {\n    options.log = false;\n    options.warn = false;\n  }\n\n  if (overrides.dynamicPublicPath) {\n    options.path = __webpack_require__.p + options.path;\n  }\n\n  if (overrides.ansiColors) options.ansiColors = JSON.parse(overrides.ansiColors);\n  if (overrides.overlayStyles) options.overlayStyles = JSON.parse(overrides.overlayStyles);\n\n  if (overrides.overlayWarnings) {\n    options.overlayWarnings = overrides.overlayWarnings == 'true';\n  }\n}\n\nfunction EventSourceWrapper() {\n  var source;\n  var lastActivity = new Date();\n  var listeners = [];\n\n  init();\n  var timer = setInterval(function() {\n    if ((new Date() - lastActivity) > options.timeout) {\n      handleDisconnect();\n    }\n  }, options.timeout / 2);\n\n  function init() {\n    source = new window.EventSource(options.path);\n    source.onopen = handleOnline;\n    source.onerror = handleDisconnect;\n    source.onmessage = handleMessage;\n  }\n\n  function handleOnline() {\n    if (options.log) console.log(\"[HMR] connected\");\n    lastActivity = new Date();\n  }\n\n  function handleMessage(event) {\n    lastActivity = new Date();\n    for (var i = 0; i < listeners.length; i++) {\n      listeners[i](event);\n    }\n  }\n\n  function handleDisconnect() {\n    clearInterval(timer);\n    source.close();\n    setTimeout(init, options.timeout);\n  }\n\n  return {\n    addMessageListener: function(fn) {\n      listeners.push(fn);\n    }\n  };\n}\n\nfunction getEventSourceWrapper() {\n  if (!window.__whmEventSourceWrapper) {\n    window.__whmEventSourceWrapper = {};\n  }\n  if (!window.__whmEventSourceWrapper[options.path]) {\n    // cache the wrapper for other entries loaded on\n    // the same page with the same options.path\n    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper();\n  }\n  return window.__whmEventSourceWrapper[options.path];\n}\n\nfunction connect() {\n  getEventSourceWrapper().addMessageListener(handleMessage);\n\n  function handleMessage(event) {\n    if (event.data == \"\\uD83D\\uDC93\") {\n      return;\n    }\n    try {\n      processMessage(JSON.parse(event.data));\n    } catch (ex) {\n      if (options.warn) {\n        console.warn(\"Invalid HMR message: \" + event.data + \"\\n\" + ex);\n      }\n    }\n  }\n}\n\n// the reporter needs to be a singleton on the page\n// in case the client is being used by multiple bundles\n// we only want to report once.\n// all the errors will go to all clients\nvar singletonKey = '__webpack_hot_middleware_reporter__';\nvar reporter;\nif (typeof window !== 'undefined') {\n  if (!window[singletonKey]) {\n    window[singletonKey] = createReporter();\n  }\n  reporter = window[singletonKey];\n}\n\nfunction createReporter() {\n  var strip = __webpack_require__(/*! strip-ansi */ \"./node_modules/strip-ansi/index.js\");\n\n  var overlay;\n  if (typeof document !== 'undefined' && options.overlay) {\n    overlay = __webpack_require__(/*! ./client-overlay */ \"./node_modules/webpack-hot-middleware/client-overlay.js\")({\n      ansiColors: options.ansiColors,\n      overlayStyles: options.overlayStyles\n    });\n  }\n\n  var styles = {\n    errors: \"color: #ff0000;\",\n    warnings: \"color: #999933;\"\n  };\n  var previousProblems = null;\n  function log(type, obj) {\n    var newProblems = obj[type].map(function(msg) { return strip(msg); }).join('\\n');\n    if (previousProblems == newProblems) {\n      return;\n    } else {\n      previousProblems = newProblems;\n    }\n\n    var style = styles[type];\n    var name = obj.name ? \"'\" + obj.name + \"' \" : \"\";\n    var title = \"[HMR] bundle \" + name + \"has \" + obj[type].length + \" \" + type;\n    // NOTE: console.warn or console.error will print the stack trace\n    // which isn't helpful here, so using console.log to escape it.\n    if (console.group && console.groupEnd) {\n      console.group(\"%c\" + title, style);\n      console.log(\"%c\" + newProblems, style);\n      console.groupEnd();\n    } else {\n      console.log(\n        \"%c\" + title + \"\\n\\t%c\" + newProblems.replace(/\\n/g, \"\\n\\t\"),\n        style + \"font-weight: bold;\",\n        style + \"font-weight: normal;\"\n      );\n    }\n  }\n\n  return {\n    cleanProblemsCache: function () {\n      previousProblems = null;\n    },\n    problems: function(type, obj) {\n      if (options.warn) {\n        log(type, obj);\n      }\n      if (overlay) {\n        if (options.overlayWarnings || type === 'errors') {\n          overlay.showProblems(type, obj[type]);\n          return false;\n        }\n        overlay.clear();\n      }\n      return true;\n    },\n    success: function() {\n      if (overlay) overlay.clear();\n    },\n    useCustomOverlay: function(customOverlay) {\n      overlay = customOverlay;\n    }\n  };\n}\n\nvar processUpdate = __webpack_require__(/*! ./process-update */ \"./node_modules/webpack-hot-middleware/process-update.js\");\n\nvar customHandler;\nvar subscribeAllHandler;\nfunction processMessage(obj) {\n  switch(obj.action) {\n    case \"building\":\n      if (options.log) {\n        console.log(\n          \"[HMR] bundle \" + (obj.name ? \"'\" + obj.name + \"' \" : \"\") +\n          \"rebuilding\"\n        );\n      }\n      break;\n    case \"built\":\n      if (options.log) {\n        console.log(\n          \"[HMR] bundle \" + (obj.name ? \"'\" + obj.name + \"' \" : \"\") +\n          \"rebuilt in \" + obj.time + \"ms\"\n        );\n      }\n      // fall through\n    case \"sync\":\n      if (obj.name && options.name && obj.name !== options.name) {\n        return;\n      }\n      var applyUpdate = true;\n      if (obj.errors.length > 0) {\n        if (reporter) reporter.problems('errors', obj);\n        applyUpdate = false;\n      } else if (obj.warnings.length > 0) {\n        if (reporter) {\n          var overlayShown = reporter.problems('warnings', obj);\n          applyUpdate = overlayShown;\n        }\n      } else {\n        if (reporter) {\n          reporter.cleanProblemsCache();\n          reporter.success();\n        }\n      }\n      if (applyUpdate) {\n        processUpdate(obj.hash, obj.modules, options);\n      }\n      break;\n    default:\n      if (customHandler) {\n        customHandler(obj);\n      }\n  }\n\n  if (subscribeAllHandler) {\n    subscribeAllHandler(obj);\n  }\n}\n\nif (module) {\n  module.exports = {\n    subscribeAll: function subscribeAll(handler) {\n      subscribeAllHandler = handler;\n    },\n    subscribe: function subscribe(handler) {\n      customHandler = handler;\n    },\n    useCustomOverlay: function useCustomOverlay(customOverlay) {\n      if (reporter) reporter.useCustomOverlay(customOverlay);\n    },\n    setOptionsAndConnect: setOptionsAndConnect\n  };\n}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false\", __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///(webpack)-hot-middleware/client.js?");

/***/ }),

/***/ "./node_modules/webpack-hot-middleware/process-update.js":
/*!**************************************************!*\
  !*** (webpack)-hot-middleware/process-update.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Based heavily on https://github.com/webpack/webpack/blob/\n *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js\n * Original copyright Tobias Koppers @sokra (MIT license)\n */\n\n/* global window __webpack_hash__ */\n\nif (false) {}\n\nvar hmrDocsUrl = \"https://webpack.js.org/concepts/hot-module-replacement/\"; // eslint-disable-line max-len\n\nvar lastHash;\nvar failureStatuses = { abort: 1, fail: 1 };\nvar applyOptions = { \t\t\t\t\n  ignoreUnaccepted: true,\n  ignoreDeclined: true,\n  ignoreErrored: true,\n  onUnaccepted: function(data) {\n    console.warn(\"Ignored an update to unaccepted module \" + data.chain.join(\" -> \"));\n  },\n  onDeclined: function(data) {\n    console.warn(\"Ignored an update to declined module \" + data.chain.join(\" -> \"));\n  },\n  onErrored: function(data) {\n    console.error(data.error);\n    console.warn(\"Ignored an error while updating module \" + data.moduleId + \" (\" + data.type + \")\");\n  } \n}\n\nfunction upToDate(hash) {\n  if (hash) lastHash = hash;\n  return lastHash == __webpack_require__.h();\n}\n\nmodule.exports = function(hash, moduleMap, options) {\n  var reload = options.reload;\n  if (!upToDate(hash) && module.hot.status() == \"idle\") {\n    if (options.log) console.log(\"[HMR] Checking for updates on the server...\");\n    check();\n  }\n\n  function check() {\n    var cb = function(err, updatedModules) {\n      if (err) return handleError(err);\n\n      if(!updatedModules) {\n        if (options.warn) {\n          console.warn(\"[HMR] Cannot find update (Full reload needed)\");\n          console.warn(\"[HMR] (Probably because of restarting the server)\");\n        }\n        performReload();\n        return null;\n      }\n\n      var applyCallback = function(applyErr, renewedModules) {\n        if (applyErr) return handleError(applyErr);\n\n        if (!upToDate()) check();\n\n        logUpdates(updatedModules, renewedModules);\n      };\n\n      var applyResult = module.hot.apply(applyOptions, applyCallback);\n      // webpack 2 promise\n      if (applyResult && applyResult.then) {\n        // HotModuleReplacement.runtime.js refers to the result as `outdatedModules`\n        applyResult.then(function(outdatedModules) {\n          applyCallback(null, outdatedModules);\n        });\n        applyResult.catch(applyCallback);\n      }\n\n    };\n\n    var result = module.hot.check(false, cb);\n    // webpack 2 promise\n    if (result && result.then) {\n        result.then(function(updatedModules) {\n            cb(null, updatedModules);\n        });\n        result.catch(cb);\n    }\n  }\n\n  function logUpdates(updatedModules, renewedModules) {\n    var unacceptedModules = updatedModules.filter(function(moduleId) {\n      return renewedModules && renewedModules.indexOf(moduleId) < 0;\n    });\n\n    if(unacceptedModules.length > 0) {\n      if (options.warn) {\n        console.warn(\n          \"[HMR] The following modules couldn't be hot updated: \" +\n          \"(Full reload needed)\\n\" +\n          \"This is usually because the modules which have changed \" +\n          \"(and their parents) do not know how to hot reload themselves. \" +\n          \"See \" + hmrDocsUrl + \" for more details.\"\n        );\n        unacceptedModules.forEach(function(moduleId) {\n          console.warn(\"[HMR]  - \" + moduleMap[moduleId]);\n        });\n      }\n      performReload();\n      return;\n    }\n\n    if (options.log) {\n      if(!renewedModules || renewedModules.length === 0) {\n        console.log(\"[HMR] Nothing hot updated.\");\n      } else {\n        console.log(\"[HMR] Updated modules:\");\n        renewedModules.forEach(function(moduleId) {\n          console.log(\"[HMR]  - \" + moduleMap[moduleId]);\n        });\n      }\n\n      if (upToDate()) {\n        console.log(\"[HMR] App is up to date.\");\n      }\n    }\n  }\n\n  function handleError(err) {\n    if (module.hot.status() in failureStatuses) {\n      if (options.warn) {\n        console.warn(\"[HMR] Cannot check for update (Full reload needed)\");\n        console.warn(\"[HMR] \" + err.stack || err.message);\n      }\n      performReload();\n      return;\n    }\n    if (options.warn) {\n      console.warn(\"[HMR] Update check failed: \" + err.stack || err.message);\n    }\n  }\n\n  function performReload() {\n    if (reload) {\n      if (options.warn) console.warn(\"[HMR] Reloading page\");\n      window.location.reload();\n    }\n  }\n};\n\n\n//# sourceURL=webpack:///(webpack)-hot-middleware/process-update.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function() {\r\n\tthrow new Error(\"define cannot be used indirect\");\r\n};\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/amd-define.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */\r\nmodule.exports = __webpack_amd_options__;\r\n\n/* WEBPACK VAR INJECTION */}.call(this, {}))\n\n//# sourceURL=webpack:///(webpack)/buildin/amd-options.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!*********************************************************************************************************!*\
  !*** delegated ./node_modules/webpack/buildin/global.js from dll-reference vendor_dd3ff9292aed8397c480 ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = (__webpack_require__(/*! dll-reference vendor_dd3ff9292aed8397c480 */ \"dll-reference vendor_dd3ff9292aed8397c480\"))(84);\n\n//# sourceURL=webpack:///delegated_./node_modules/webpack/buildin/global.js_from_dll-reference_vendor_dd3ff9292aed8397c480?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\r\n\tif (!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif (!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.l;\r\n\t\t\t}\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tget: function() {\r\n\t\t\t\treturn module.i;\r\n\t\t\t}\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n};\r\n\n\n//# sourceURL=webpack:///(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/actions/index.js":
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.visitVideo = exports.visitCategory = exports.notFound = exports.goToAdmin = exports.goHome = exports.goToPage = void 0;\n\nvar _reduxFirstRouter = __webpack_require__(/*! redux-first-router */ \"./node_modules/redux-first-router/dist/index.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\n// try dispatching these from the redux devTools\nvar goToPage = function goToPage(type, category) {\n  return {\n    type: type,\n    payload: category && {\n      category: category\n    }\n  };\n};\n\nexports.goToPage = goToPage;\n\nvar goHome = function goHome() {\n  return {\n    type: 'HOME'\n  };\n};\n\nexports.goHome = goHome;\n\nvar goToAdmin = function goToAdmin() {\n  return {\n    type: 'ADMIN'\n  };\n};\n\nexports.goToAdmin = goToAdmin;\n\nvar notFound = function notFound() {\n  return {\n    type: _reduxFirstRouter.NOT_FOUND\n  };\n};\n\nexports.notFound = notFound;\n\nvar visitCategory = function visitCategory(category) {\n  return {\n    type: 'LIST',\n    payload: {\n      category: category\n    }\n  };\n};\n\nexports.visitCategory = visitCategory;\n\nvar visitVideo = function visitVideo(slug) {\n  return {\n    type: 'VIDEO',\n    payload: {\n      slug: slug\n    }\n  };\n};\n\nexports.visitVideo = visitVideo;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(goToPage, \"goToPage\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\actions\\\\index.js\");\n  reactHotLoader.register(goHome, \"goHome\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\actions\\\\index.js\");\n  reactHotLoader.register(goToAdmin, \"goToAdmin\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\actions\\\\index.js\");\n  reactHotLoader.register(notFound, \"notFound\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\actions\\\\index.js\");\n  reactHotLoader.register(visitCategory, \"visitCategory\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\actions\\\\index.js\");\n  reactHotLoader.register(visitVideo, \"visitVideo\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\actions\\\\index.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/actions/index.js?");

/***/ }),

/***/ "./src/components lazy recursive ^\\.\\/.*$":
/*!*******************************************************!*\
  !*** ./src/components lazy ^\.\/.*$ namespace object ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var map = {\n\t\"./Admin\": [\n\t\t\"./src/components/Admin.js\",\n\t\t0\n\t],\n\t\"./Admin.js\": [\n\t\t\"./src/components/Admin.js\",\n\t\t0\n\t],\n\t\"./App\": [\n\t\t\"./src/components/App.js\"\n\t],\n\t\"./App.js\": [\n\t\t\"./src/components/App.js\"\n\t],\n\t\"./DevTools\": [\n\t\t\"./src/components/DevTools.js\"\n\t],\n\t\"./DevTools.js\": [\n\t\t\"./src/components/DevTools.js\"\n\t],\n\t\"./Error\": [\n\t\t\"./src/components/Error.js\"\n\t],\n\t\"./Error.js\": [\n\t\t\"./src/components/Error.js\"\n\t],\n\t\"./Home\": [\n\t\t\"./src/components/Home.js\",\n\t\t1\n\t],\n\t\"./Home.js\": [\n\t\t\"./src/components/Home.js\",\n\t\t1\n\t],\n\t\"./List\": [\n\t\t\"./src/components/List.js\",\n\t\t2\n\t],\n\t\"./List.js\": [\n\t\t\"./src/components/List.js\",\n\t\t2\n\t],\n\t\"./Loading\": [\n\t\t\"./src/components/Loading.js\"\n\t],\n\t\"./Loading.js\": [\n\t\t\"./src/components/Loading.js\"\n\t],\n\t\"./Login\": [\n\t\t\"./src/components/Login.js\",\n\t\t3\n\t],\n\t\"./Login.js\": [\n\t\t\"./src/components/Login.js\",\n\t\t3\n\t],\n\t\"./NotFound\": [\n\t\t\"./src/components/NotFound.js\",\n\t\t4\n\t],\n\t\"./NotFound.js\": [\n\t\t\"./src/components/NotFound.js\",\n\t\t4\n\t],\n\t\"./Player\": [\n\t\t\"./src/components/Player.js\",\n\t\t5\n\t],\n\t\"./Player.js\": [\n\t\t\"./src/components/Player.js\",\n\t\t5\n\t],\n\t\"./Sidebar\": [\n\t\t\"./src/components/Sidebar.js\"\n\t],\n\t\"./Sidebar.js\": [\n\t\t\"./src/components/Sidebar.js\"\n\t],\n\t\"./Switcher\": [\n\t\t\"./src/components/Switcher.js\"\n\t],\n\t\"./Switcher.js\": [\n\t\t\"./src/components/Switcher.js\"\n\t],\n\t\"./Video\": [\n\t\t\"./src/components/Video.js\",\n\t\t6\n\t],\n\t\"./Video.js\": [\n\t\t\"./src/components/Video.js\",\n\t\t6\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tvar ids = map[req];\n\tif(!ids) {\n\t\treturn Promise.resolve().then(function() {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\treturn Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {\n\t\tvar id = ids[0];\n\t\treturn __webpack_require__.t(id, 7);\n\t});\n}\nwebpackAsyncContext.keys = function webpackAsyncContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackAsyncContext.id = \"./src/components lazy recursive ^\\\\.\\\\/.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack:///./src/components_lazy_^\\.\\/.*$_namespace_object?");

/***/ }),

/***/ "./src/components/App.js":
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _DevTools = _interopRequireDefault(__webpack_require__(/*! ./DevTools */ \"./src/components/DevTools.js\"));\n\nvar _Sidebar = _interopRequireDefault(__webpack_require__(/*! ./Sidebar */ \"./src/components/Sidebar.js\"));\n\nvar _Switcher = _interopRequireDefault(__webpack_require__(/*! ./Switcher */ \"./src/components/Switcher.js\"));\n\nvar _App = _interopRequireDefault(__webpack_require__(/*! ../css/App */ \"./src/css/App.css\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  return _react.default.createElement(\"div\", null, _react.default.createElement(\"div\", {\n    className: _App.default.app\n  }, _react.default.createElement(_Sidebar.default, null), _react.default.createElement(_Switcher.default, null)), _react.default.createElement(_DevTools.default, null));\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\App.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/App.js?");

/***/ }),

/***/ "./src/components/DevTools.js":
/*!************************************!*\
  !*** ./src/components/DevTools.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n\n__webpack_require__(/*! core-js/modules/es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es6.object.keys */ \"./node_modules/core-js/modules/es6.object.keys.js\");\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _DevTools = _interopRequireDefault(__webpack_require__(/*! ../css/DevTools */ \"./src/css/DevTools.css\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar DevTools = function DevTools() {\n  return _react.default.createElement(\"div\", {\n    className: _DevTools.default.container\n  }, _react.default.createElement(\"div\", {\n    className: _DevTools.default.titleBar\n  }, _react.default.createElement(\"span\", null, \"ACTIONS\"), _react.default.createElement(\"span\", null, \"DEV-TOOLS\"), _react.default.createElement(\"span\", null, \"STATE\")), _react.default.createElement(\"div\", {\n    className: _DevTools.default.devTools\n  }, _react.default.createElement(ActionsBox, null), _react.default.createElement(StateBox, null)));\n};\n\nvar ActionsBoxComponent = function ActionsBoxComponent(_ref) {\n  var actions = _ref.actions;\n  return _react.default.createElement(\"div\", {\n    className: _DevTools.default.actionsBox\n  }, _react.default.createElement(\"pre\", null, JSON.stringify(actions, null, 1)));\n};\n\nvar ActionsBox = (0, _reactRedux.connect)(function (_ref2) {\n  var actions = _ref2.actions;\n  return {\n    actions: actions\n  };\n})(ActionsBoxComponent);\n\nvar StateBoxComponent = function StateBoxComponent(state) {\n  return _react.default.createElement(\"div\", {\n    className: _DevTools.default.stateBox\n  }, _react.default.createElement(\"pre\", null, JSON.stringify(state, null, 1)));\n};\n\nvar StateBox = (0, _reactRedux.connect)(function (state) {\n  return _objectSpread({}, state, {\n    actions: undefined\n  });\n})(StateBoxComponent);\nvar _default = DevTools;\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(DevTools, \"DevTools\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\DevTools.js\");\n  reactHotLoader.register(ActionsBoxComponent, \"ActionsBoxComponent\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\DevTools.js\");\n  reactHotLoader.register(ActionsBox, \"ActionsBox\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\DevTools.js\");\n  reactHotLoader.register(StateBoxComponent, \"StateBoxComponent\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\DevTools.js\");\n  reactHotLoader.register(StateBox, \"StateBox\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\DevTools.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\DevTools.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/DevTools.js?");

/***/ }),

/***/ "./src/components/Error.js":
/*!*********************************!*\
  !*** ./src/components/Error.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _Switcher = __webpack_require__(/*! ../css/Switcher */ \"./src/css/Switcher.css\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default(error) {\n  return _react.default.createElement(\"div\", {\n    className: _Switcher.notFound\n  }, \"ERROR: \", error.message);\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Error.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/Error.js?");

/***/ }),

/***/ "./src/components/Loading.js":
/*!***********************************!*\
  !*** ./src/components/Loading.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _Switcher = __webpack_require__(/*! ../css/Switcher */ \"./src/css/Switcher.css\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  return _react.default.createElement(\"div\", {\n    className: _Switcher.spinner\n  }, _react.default.createElement(\"div\", null));\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Loading.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/Loading.js?");

/***/ }),

/***/ "./src/components/Sidebar.js":
/*!***********************************!*\
  !*** ./src/components/Sidebar.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _reduxFirstRouterLink = _interopRequireWildcard(__webpack_require__(/*! redux-first-router-link */ \"./node_modules/redux-first-router-link/dist/index.js\"));\n\nvar _actions = __webpack_require__(/*! ../actions */ \"./src/actions/index.js\");\n\nvar _Sidebar = _interopRequireDefault(__webpack_require__(/*! ../css/Sidebar */ \"./src/css/Sidebar.css\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar Sidebar = function Sidebar(_ref) {\n  var _onClick = _ref.onClick,\n      path = _ref.path;\n  return _react.default.createElement(\"div\", {\n    className: _Sidebar.default.sidebar\n  }, _react.default.createElement(\"h2\", null, \"SEO-FRIENDLY LINKS\"), _react.default.createElement(_reduxFirstRouterLink.NavLink, {\n    activeClassName: _Sidebar.default.active,\n    exact: true,\n    to: \"/\"\n  }, \"HOME\"), _react.default.createElement(_reduxFirstRouterLink.NavLink, {\n    activeClassName: _Sidebar.default.active,\n    to: \"/list/db-graphql\"\n  }, \"DB & GRAPHQL\"), _react.default.createElement(_reduxFirstRouterLink.NavLink, {\n    activeClassName: _Sidebar.default.active,\n    to: ['list', 'react-redux']\n  }, \"REACT & REDUX\"), _react.default.createElement(_reduxFirstRouterLink.NavLink, {\n    activeClassName: _Sidebar.default.active,\n    to: {\n      type: 'LIST',\n      payload: {\n        category: 'fp'\n      }\n    }\n  }, \"FP\"), _react.default.createElement(\"div\", {\n    style: {\n      height: 20\n    }\n  }), _react.default.createElement(\"h2\", null, \"EVENT HANDLERS\"), _react.default.createElement(\"span\", {\n    className: active(path, '/'),\n    onClick: function onClick() {\n      return _onClick('HOME');\n    }\n  }, \"HOME\"), _react.default.createElement(\"span\", {\n    className: active(path, '/list/db-graphql'),\n    onClick: function onClick() {\n      return _onClick('LIST', 'db-graphql');\n    }\n  }, \"DB & GRAPHQL\"), _react.default.createElement(\"span\", {\n    className: active(path, '/list/react-redux'),\n    onClick: function onClick() {\n      return _onClick('LIST', 'react-redux');\n    }\n  }, \"REACT & REDUX\"), _react.default.createElement(\"span\", {\n    className: active(path, '/list/fp'),\n    onClick: function onClick() {\n      return _onClick('LIST', 'fp');\n    }\n  }, \"FP\"), _react.default.createElement(\"div\", {\n    style: {\n      height: 14\n    }\n  }), _react.default.createElement(_reduxFirstRouterLink.NavLink, {\n    to: {\n      type: 'ADMIN'\n    },\n    activeClassName: _Sidebar.default.active\n  }, \"ADMIN\"));\n};\n\nvar active = function active(currentPath, path) {\n  return currentPath === path ? _Sidebar.default.active : '';\n};\n\nvar mapDispatch = {\n  onClick: _actions.goToPage\n};\n\nvar mapState = function mapState(_ref2) {\n  var location = _ref2.location;\n  return {\n    path: location.pathname\n  };\n};\n\nvar _default = (0, _reactRedux.connect)(mapState, mapDispatch)(Sidebar);\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(Sidebar, \"Sidebar\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Sidebar.js\");\n  reactHotLoader.register(active, \"active\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Sidebar.js\");\n  reactHotLoader.register(mapDispatch, \"mapDispatch\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Sidebar.js\");\n  reactHotLoader.register(mapState, \"mapState\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Sidebar.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Sidebar.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/Sidebar.js?");

/***/ }),

/***/ "./src/components/Switcher.js":
/*!************************************!*\
  !*** ./src/components/Switcher.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n\n__webpack_require__(/*! core-js/modules/es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es6.object.keys */ \"./node_modules/core-js/modules/es6.object.keys.js\");\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _transitionGroup = __webpack_require__(/*! transition-group */ \"./node_modules/transition-group/dist/index.js\");\n\nvar _reactUniversalComponent = _interopRequireDefault(__webpack_require__(/*! react-universal-component */ \"./node_modules/react-universal-component/dist/index.js\"));\n\nvar _Loading = _interopRequireDefault(__webpack_require__(/*! ./Loading */ \"./src/components/Loading.js\"));\n\nvar _Error = _interopRequireDefault(__webpack_require__(/*! ./Error */ \"./src/components/Error.js\"));\n\nvar _isLoading = _interopRequireDefault(__webpack_require__(/*! ../selectors/isLoading */ \"./src/selectors/isLoading.js\"));\n\nvar _Switcher = _interopRequireDefault(__webpack_require__(/*! ../css/Switcher */ \"./src/css/Switcher.css\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nvar UniversalComponent = (0, _reactUniversalComponent.default)(function (_ref) {\n  var page = _ref.page;\n  return __webpack_require__(\"./src/components lazy recursive ^\\\\.\\\\/.*$\")(\"./\".concat(page));\n}, {\n  minDelay: 500,\n  loading: _Loading.default,\n  error: _Error.default\n});\n\nvar Switcher = function Switcher(_ref2) {\n  var page = _ref2.page,\n      direction = _ref2.direction,\n      isLoading = _ref2.isLoading;\n  return _react.default.createElement(_transitionGroup.TransitionGroup, {\n    className: \"\".concat(_Switcher.default.switcher, \" \").concat(direction),\n    duration: 500,\n    prefix: \"fade\"\n  }, _react.default.createElement(_transitionGroup.Transition, {\n    key: page\n  }, _react.default.createElement(UniversalComponent, {\n    page: page,\n    isLoading: isLoading\n  })));\n};\n\nvar mapState = function mapState(_ref3) {\n  var page = _ref3.page,\n      direction = _ref3.direction,\n      state = _objectWithoutProperties(_ref3, [\"page\", \"direction\"]);\n\n  return {\n    page: page,\n    direction: direction,\n    isLoading: (0, _isLoading.default)(state)\n  };\n};\n\nvar _default = (0, _reactRedux.connect)(mapState)(Switcher);\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(UniversalComponent, \"UniversalComponent\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Switcher.js\");\n  reactHotLoader.register(Switcher, \"Switcher\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Switcher.js\");\n  reactHotLoader.register(mapState, \"mapState\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Switcher.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\components\\\\Switcher.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/components/Switcher.js?");

/***/ }),

/***/ "./src/configureStore.js":
/*!*******************************!*\
  !*** ./src/configureStore.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n\n__webpack_require__(/*! core-js/modules/es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es6.object.keys */ \"./node_modules/core-js/modules/es6.object.keys.js\");\n\nvar _redux = __webpack_require__(/*! redux */ \"./node_modules/redux/es/redux.js\");\n\nvar _logOnlyInProduction = __webpack_require__(/*! redux-devtools-extension/logOnlyInProduction */ \"./node_modules/redux-devtools-extension/logOnlyInProduction.js\");\n\nvar _reduxFirstRouter = __webpack_require__(/*! redux-first-router */ \"./node_modules/redux-first-router/dist/index.js\");\n\nvar _routesMap = _interopRequireDefault(__webpack_require__(/*! ./routesMap */ \"./src/routesMap.js\"));\n\nvar _options = _interopRequireDefault(__webpack_require__(/*! ./options */ \"./src/options.js\"));\n\nvar reducers = _interopRequireWildcard(__webpack_require__(/*! ./reducers */ \"./src/reducers/index.js\"));\n\nvar actionCreators = _interopRequireWildcard(__webpack_require__(/*! ./actions */ \"./src/actions/index.js\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar _default = function _default(history, preLoadedState) {\n  var _connectRoutes = (0, _reduxFirstRouter.connectRoutes)(history, _routesMap.default, _options.default),\n      reducer = _connectRoutes.reducer,\n      middleware = _connectRoutes.middleware,\n      enhancer = _connectRoutes.enhancer,\n      thunk = _connectRoutes.thunk;\n\n  var rootReducer = (0, _redux.combineReducers)(_objectSpread({}, reducers, {\n    location: reducer\n  }));\n  var middlewares = (0, _redux.applyMiddleware)(middleware);\n  var enhancers = composeEnhancers(enhancer, middlewares);\n  var store = (0, _redux.createStore)(rootReducer, preLoadedState, enhancers);\n\n  if (true) {\n    module.hot.accept(/*! ./reducers/index */ \"./src/reducers/index.js\", function () {\n      var reducers = __webpack_require__(/*! ./reducers/index */ \"./src/reducers/index.js\");\n\n      var rootReducer = (0, _redux.combineReducers)(_objectSpread({}, reducers, {\n        location: reducer\n      }));\n      store.replaceReducer(rootReducer);\n    });\n  }\n\n  return {\n    store: store,\n    thunk: thunk\n  };\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n\nvar composeEnhancers = function composeEnhancers() {\n  return typeof window !== 'undefined' ? (0, _logOnlyInProduction.composeWithDevTools)({\n    actionCreators: actionCreators\n  }).apply(void 0, arguments) : _redux.compose.apply(void 0, arguments);\n};\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(composeEnhancers, \"composeEnhancers\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\configureStore.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\configureStore.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/configureStore.js?");

/***/ }),

/***/ "./src/css/App.css":
/*!*************************!*\
  !*** ./src/css/App.css ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by extract-css-chunks-webpack-plugin\n    if(true) {\n      // 1533502126422\n      var cssReload = __webpack_require__(/*! ../../node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js */ \"./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/css/App.css?");

/***/ }),

/***/ "./src/css/DevTools.css":
/*!******************************!*\
  !*** ./src/css/DevTools.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by extract-css-chunks-webpack-plugin\n    if(true) {\n      // 1533502126431\n      var cssReload = __webpack_require__(/*! ../../node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js */ \"./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/css/DevTools.css?");

/***/ }),

/***/ "./src/css/Sidebar.css":
/*!*****************************!*\
  !*** ./src/css/Sidebar.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by extract-css-chunks-webpack-plugin\n    if(true) {\n      // 1533502126439\n      var cssReload = __webpack_require__(/*! ../../node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js */ \"./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/css/Sidebar.css?");

/***/ }),

/***/ "./src/css/Switcher.css":
/*!******************************!*\
  !*** ./src/css/Switcher.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by extract-css-chunks-webpack-plugin\n    if(true) {\n      // 1533502126446\n      var cssReload = __webpack_require__(/*! ../../node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js */ \"./node_modules/extract-css-chunks-webpack-plugin/dist/hotModuleReplacement.js\")(module.i, {\"fileMap\":\"{fileName}\"});\n      module.hot.dispose(cssReload);\n      module.hot.accept(undefined, cssReload);\n    }\n  \n\n//# sourceURL=webpack:///./src/css/Switcher.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"./node_modules/react/index.js\"));\n\nvar _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n\nvar _createBrowserHistory = _interopRequireDefault(__webpack_require__(/*! history/createBrowserHistory */ \"./node_modules/history/createBrowserHistory.js\"));\n\nvar _reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\");\n\nvar _App = _interopRequireDefault(__webpack_require__(/*! ./components/App */ \"./src/components/App.js\"));\n\nvar _configureStore2 = _interopRequireDefault(__webpack_require__(/*! ./configureStore */ \"./src/configureStore.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar history = (0, _createBrowserHistory.default)();\n\nvar _configureStore = (0, _configureStore2.default)(history, window.REDUX_STATE),\n    store = _configureStore.store;\n\nvar render = function render(App) {\n  var root = document.getElementById('root');\n\n  _reactDom.default.hydrate(_react.default.createElement(_reactHotLoader.AppContainer, null, _react.default.createElement(_reactRedux.Provider, {\n    store: store\n  }, _react.default.createElement(App, null))), root);\n};\n\nrender(_App.default);\n\nif (true) {\n  module.hot.accept(/*! ./components/App */ \"./src/components/App.js\", function () {\n    // eslint-disable-next-line\n    var App = __webpack_require__(/*! ./components/App */ \"./src/components/App.js\").default;\n\n    render(App);\n  });\n}\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(history, \"history\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\index.js\");\n  reactHotLoader.register(store, \"store\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\index.js\");\n  reactHotLoader.register(render, \"render\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\index.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _reduxFirstRouter = __webpack_require__(/*! redux-first-router */ \"./node_modules/redux-first-router/dist/index.js\");\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = {\n  onBeforeChange: function onBeforeChange(dispatch, getState, action) {\n    var allowed = (0, _utils.isAllowed)(action.type, getState());\n\n    if (!allowed) {\n      var _action = (0, _reduxFirstRouter.redirect)({\n        type: 'LOGIN'\n      });\n\n      dispatch(_action);\n    }\n  },\n  onAfterChange: function onAfterChange(dispatch, getState) {\n    var type = getState().location.type;\n\n    if (type === 'LOGIN' && !_utils.isServer) {\n      setTimeout(function () {\n        alert(alertMessage);\n      }, 1500);\n    }\n  }\n};\nvar _default2 = _default;\nexports.default = _default2;\nvar alertMessage = \"NICE, You're adventurous! Try changing the jwToken cookie from 'fake' to 'real' in server/index.js (and manually refresh) to access the Admin Panel. Then 'onBeforeChange' will let you in.\";\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(alertMessage, \"alertMessage\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\options.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\options.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/options.js?");

/***/ }),

/***/ "./src/reducers/actions.js":
/*!*********************************!*\
  !*** ./src/reducers/actions.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/es6.array.from */ \"./node_modules/core-js/modules/es6.array.from.js\");\n\n__webpack_require__(/*! core-js/modules/es6.regexp.to-string */ \"./node_modules/core-js/modules/es6.regexp.to-string.js\");\n\n__webpack_require__(/*! core-js/modules/es7.symbol.async-iterator */ \"./node_modules/core-js/modules/es7.symbol.async-iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es6.symbol */ \"./node_modules/core-js/modules/es6.symbol.js\");\n\n__webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (action.type === '@@redux/INIT' || action.type === '@@INIT') {\n    return state;\n  }\n\n  return [action].concat(_toConsumableArray(state));\n};\n\nvar _default2 = _default; // NOTE: this isn't a reducer you are likely to have in your app, since it's\n// for \"devTools.\" Don't worry that it does some weird things. The reason is:\n// since we have SSR, we don't want these actions displayed in HTML\n// or checksums won't match up since the server doesnt have them,\n// but usually you don't send an array of actions over the wire.\n\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\actions.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/actions.js?");

/***/ }),

/***/ "./src/reducers/category.js":
/*!**********************************!*\
  !*** ./src/reducers/category.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return action.type === 'LIST' ? action.payload.category : state;\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\category.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/category.js?");

/***/ }),

/***/ "./src/reducers/direction.js":
/*!***********************************!*\
  !*** ./src/reducers/direction.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (!action.meta || !action.meta.location) {\n    return state;\n  }\n\n  var type = action.type;\n  var prevType = action.meta.location.prev.type;\n\n  if (type === prevType) {\n    return state;\n  }\n\n  if (type === 'HOME') {\n    return 'back';\n  } else if (type === 'LIST' && prevType === 'HOME') {\n    return 'next';\n  } else if (type === 'LIST' && prevType === 'VIDEO') {\n    return 'back';\n  } else if (type === 'LIST' && prevType === 'PLAY') {\n    return 'back';\n  } else if (type === 'VIDEO' && prevType === 'LIST') {\n    return 'next';\n  } else if (type === 'LOGIN') {\n    return 'back';\n  } else if (type === 'ADMIN') {\n    return 'next';\n  }\n\n  return state;\n};\n\nvar _default2 = _default; // this is an example of some fun stuff you can do easily trigger animations\n// from state. Look into <TransitionGroup /> within components/Switcher.js\n\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\direction.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/direction.js?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nObject.defineProperty(exports, \"page\", {\n  enumerable: true,\n  get: function get() {\n    return _page.default;\n  }\n});\nObject.defineProperty(exports, \"slug\", {\n  enumerable: true,\n  get: function get() {\n    return _slug.default;\n  }\n});\nObject.defineProperty(exports, \"category\", {\n  enumerable: true,\n  get: function get() {\n    return _category.default;\n  }\n});\nObject.defineProperty(exports, \"direction\", {\n  enumerable: true,\n  get: function get() {\n    return _direction.default;\n  }\n});\nObject.defineProperty(exports, \"videosHash\", {\n  enumerable: true,\n  get: function get() {\n    return _videosHash.default;\n  }\n});\nObject.defineProperty(exports, \"videosByCategory\", {\n  enumerable: true,\n  get: function get() {\n    return _videosByCategory.default;\n  }\n});\nObject.defineProperty(exports, \"playing\", {\n  enumerable: true,\n  get: function get() {\n    return _playing.default;\n  }\n});\nObject.defineProperty(exports, \"user\", {\n  enumerable: true,\n  get: function get() {\n    return _user.default;\n  }\n});\nObject.defineProperty(exports, \"title\", {\n  enumerable: true,\n  get: function get() {\n    return _title.default;\n  }\n});\nObject.defineProperty(exports, \"actions\", {\n  enumerable: true,\n  get: function get() {\n    return _actions.default;\n  }\n});\nObject.defineProperty(exports, \"jwToken\", {\n  enumerable: true,\n  get: function get() {\n    return _jwToken.default;\n  }\n});\n\nvar _page = _interopRequireDefault(__webpack_require__(/*! ./page */ \"./src/reducers/page.js\"));\n\nvar _slug = _interopRequireDefault(__webpack_require__(/*! ./slug */ \"./src/reducers/slug.js\"));\n\nvar _category = _interopRequireDefault(__webpack_require__(/*! ./category */ \"./src/reducers/category.js\"));\n\nvar _direction = _interopRequireDefault(__webpack_require__(/*! ./direction */ \"./src/reducers/direction.js\"));\n\nvar _videosHash = _interopRequireDefault(__webpack_require__(/*! ./videosHash */ \"./src/reducers/videosHash.js\"));\n\nvar _videosByCategory = _interopRequireDefault(__webpack_require__(/*! ./videosByCategory */ \"./src/reducers/videosByCategory.js\"));\n\nvar _playing = _interopRequireDefault(__webpack_require__(/*! ./playing */ \"./src/reducers/playing.js\"));\n\nvar _user = _interopRequireDefault(__webpack_require__(/*! ./user */ \"./src/reducers/user.js\"));\n\nvar _title = _interopRequireDefault(__webpack_require__(/*! ./title */ \"./src/reducers/title.js\"));\n\nvar _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ \"./src/reducers/actions.js\"));\n\nvar _jwToken = _interopRequireDefault(__webpack_require__(/*! ./jwToken */ \"./src/reducers/jwToken.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/reducers/index.js?");

/***/ }),

/***/ "./src/reducers/jwToken.js":
/*!*********************************!*\
  !*** ./src/reducers/jwToken.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return action.type === 'TOKEN' && action.payload || state;\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\jwToken.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/jwToken.js?");

/***/ }),

/***/ "./src/reducers/page.js":
/*!******************************!*\
  !*** ./src/reducers/page.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _reduxFirstRouter = __webpack_require__(/*! redux-first-router */ \"./node_modules/redux-first-router/dist/index.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'HOME';\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return components[action.type] || state;\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n\nvar components = _defineProperty({\n  HOME: 'Home',\n  LIST: 'List',\n  VIDEO: 'Video',\n  ADMIN: 'Admin',\n  LOGIN: 'Login'\n}, _reduxFirstRouter.NOT_FOUND, 'NotFound'); // NOTES: this is the primary reducer demonstrating how RFR replaces the need\n// for React Router's <Route /> component.\n//\n// ALSO:  Forget a switch, use a hash table for perf.\n\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(components, \"components\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\page.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\page.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/page.js?");

/***/ }),

/***/ "./src/reducers/playing.js":
/*!*********************************!*\
  !*** ./src/reducers/playing.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return action.type === 'PLAY';\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\playing.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/playing.js?");

/***/ }),

/***/ "./src/reducers/slug.js":
/*!******************************!*\
  !*** ./src/reducers/slug.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return action.type === 'VIDEO' ? action.payload.slug : state;\n};\n\nvar _default2 = _default; // Using RFR is all about effectively making use of path segments. For good\n// SEO, slugs will become your best friend.\n//\n// Make note of the simplicity of how path parameters become your payload.\n\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\slug.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/slug.js?");

/***/ }),

/***/ "./src/reducers/title.js":
/*!*******************************!*\
  !*** ./src/reducers/title.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/es6.regexp.replace */ \"./node_modules/core-js/modules/es6.regexp.replace.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'RFR Demo';\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'HOME':\n      return 'RFR Demo';\n\n    case 'LIST':\n      return \"RFR: \".concat(capitalize(action.payload.category));\n\n    case 'VIDEO':\n      return \"RFR: \".concat(capitalize(action.payload.slug));\n\n    case 'LOGIN':\n      return 'RFR Login';\n\n    case 'ADMIN':\n      return 'RFR Admin';\n\n    default:\n      return state;\n  }\n};\n\nvar _default2 = _default;\nexports.default = _default2;\n\nvar capitalize = function capitalize(str) {\n  return str.replace(/-/g, ' ').replace(/\\b\\w/g, function (l) {\n    return l.toUpperCase();\n  });\n}; // RFR automatically changes the document.title for you :)\n\n\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(capitalize, \"capitalize\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\title.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\title.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/title.js?");

/***/ }),

/***/ "./src/reducers/user.js":
/*!******************************!*\
  !*** ./src/reducers/user.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {\n    roles: ['member']\n  };\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  return state;\n};\n\nvar _default2 = _default; // user never changes in this demo\n// TRY THIS: change 'member' to 'admin' to access private area (see src/routesMap.js)\n\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\user.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/user.js?");

/***/ }),

/***/ "./src/reducers/videosByCategory.js":
/*!******************************************!*\
  !*** ./src/reducers/videosByCategory.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/web.dom.iterable */ \"./node_modules/core-js/modules/web.dom.iterable.js\");\n\n__webpack_require__(/*! core-js/modules/es6.array.iterator */ \"./node_modules/core-js/modules/es6.array.iterator.js\");\n\n__webpack_require__(/*! core-js/modules/es6.object.keys */ \"./node_modules/core-js/modules/es6.object.keys.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (action.type === 'VIDEOS_FETCHED') {\n    var _action$payload = action.payload,\n        category = _action$payload.category,\n        videos = _action$payload.videos;\n    var slugs = videos.map(function (video) {\n      return video.slug;\n    });\n    return _objectSpread({}, state, _defineProperty({}, category, slugs));\n  }\n\n  return state;\n};\n\nvar _default2 = _default; // eg: { fp: ['slug-1', 'slug-2'], 'react-redux': ['slug-etc'] }\n\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\videosByCategory.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/videosByCategory.js?");

/***/ }),

/***/ "./src/reducers/videosHash.js":
/*!************************************!*\
  !*** ./src/reducers/videosHash.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = function _default() {\n  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  switch (action.type) {\n    case 'VIDEOS_FETCHED':\n      {\n        var videos = action.payload.videos;\n        return videos.reduce(function (videos, video) {\n          state[video.slug] = video;\n          return videos;\n        }, state);\n      }\n\n    case 'VIDEO_FOUND':\n      {\n        var _action$payload = action.payload,\n            slug = _action$payload.slug,\n            video = _action$payload.video;\n        state[slug] = video;\n        return state;\n      }\n\n    default:\n      return state;\n  }\n};\n\nvar _default2 = _default; // eg: { 'slug-1': video1, 'slug-2': video2 }\n\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\reducers\\\\videosHash.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/reducers/videosHash.js?");

/***/ }),

/***/ "./src/routesMap.js":
/*!**************************!*\
  !*** ./src/routesMap.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\n__webpack_require__(/*! core-js/modules/es6.promise */ \"./node_modules/core-js/modules/es6.promise.js\");\n\n__webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n\nvar _reduxFirstRouter = __webpack_require__(/*! redux-first-router */ \"./node_modules/redux-first-router/dist/index.js\");\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar _default = {\n  HOME: '/',\n  LIST: {\n    path: '/list/:category',\n    thunk: function () {\n      var _thunk = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(dispatch, getState) {\n        var _getState, jwToken, category, videosByCategory, videos;\n\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                _getState = getState(), jwToken = _getState.jwToken, category = _getState.location.payload.category, videosByCategory = _getState.videosByCategory;\n\n                if (!videosByCategory[category]) {\n                  _context.next = 3;\n                  break;\n                }\n\n                return _context.abrupt(\"return\");\n\n              case 3:\n                _context.next = 5;\n                return (0, _utils.fetchData)(\"/api/videos/\".concat(category), jwToken);\n\n              case 5:\n                videos = _context.sent;\n\n                if (!(videos.length === 0)) {\n                  _context.next = 8;\n                  break;\n                }\n\n                return _context.abrupt(\"return\", dispatch({\n                  type: _reduxFirstRouter.NOT_FOUND\n                }));\n\n              case 8:\n                dispatch({\n                  type: 'VIDEOS_FETCHED',\n                  payload: {\n                    videos: videos,\n                    category: category\n                  }\n                });\n\n              case 9:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      return function thunk(_x, _x2) {\n        return _thunk.apply(this, arguments);\n      };\n    }()\n  },\n  VIDEO: {\n    path: '/video/:slug',\n    thunk: function () {\n      var _thunk2 = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee2(dispatch, getState) {\n        return regeneratorRuntime.wrap(function _callee2$(_context2) {\n          while (1) {\n            switch (_context2.prev = _context2.next) {\n              case 0:\n              case \"end\":\n                return _context2.stop();\n            }\n          }\n        }, _callee2, this);\n      }));\n\n      return function thunk(_x3, _x4) {\n        return _thunk2.apply(this, arguments);\n      };\n    }()\n  },\n  PLAY: {\n    path: '/video/:slug/play',\n    thunk: function thunk(dispatch, getState) {\n      if (typeof window === 'undefined') {\n        var slug = getState().location.payload.slug;\n        var action = (0, _reduxFirstRouter.redirect)({\n          type: 'VIDEO',\n          payload: {\n            slug: slug\n          }\n        });\n        dispatch(action);\n      }\n    }\n  },\n  LOGIN: '/login',\n  ADMIN: {\n    path: '/admin',\n    // TRY: visit this path or dispatch ADMIN\n    role: 'admin' // + change jwToken to 'real' in server/index.js\n\n  } // DON'T GO DOWN THERE!\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // |\n  // ▼\n  // ANSWER: videoRoute.thunk.body:\n\n  /* HURRAY! You found the answers on the back of the cereal box!\n  \n  const { jwToken, location: { payload: { slug } } } = getState()\n  const video = await fetchData(`/api/video/${slug}`, jwToken)\n  \n  if (!video) {\n    return dispatch({ type: NOT_FOUND })\n  }\n  \n  dispatch({ type: 'VIDEO_FOUND', payload: { slug, video } })\n  */\n\n};\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\routesMap.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/routesMap.js?");

/***/ }),

/***/ "./src/selectors/isLoading.js":
/*!************************************!*\
  !*** ./src/selectors/isLoading.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _reselect = __webpack_require__(/*! reselect */ \"./node_modules/reselect/es/index.js\");\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nvar _default = (0, _reselect.createSelector)([function (state) {\n  return state.location.type;\n}, function (state) {\n  return state.location.payload;\n}, function (state) {\n  return state.videosHash;\n}, function (state) {\n  return state.videosByCategory;\n}], function (type, _ref, hash1, hash2) {\n  var slug = _ref.slug,\n      category = _ref.category;\n  if (type === 'VIDEO') return !hash1[slug];\n  if (type === 'LIST') return !hash2[category];\n});\n\nvar _default2 = _default;\nexports.default = _default2;\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(_default, \"default\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\selectors\\\\isLoading.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/selectors/isLoading.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.isAllowed = exports.fetchData = exports.isServer = void 0;\n\n__webpack_require__(/*! core-js/modules/es6.promise */ \"./node_modules/core-js/modules/es6.promise.js\");\n\n__webpack_require__(/*! core-js/modules/es7.array.includes */ \"./node_modules/core-js/modules/es7.array.includes.js\");\n\n__webpack_require__(/*! core-js/modules/es6.string.includes */ \"./node_modules/core-js/modules/es6.string.includes.js\");\n\n__webpack_require__(/*! regenerator-runtime/runtime */ \"./node_modules/regenerator-runtime/runtime.js\");\n\nvar _routesMap = _interopRequireDefault(__webpack_require__(/*! ./routesMap */ \"./src/routesMap.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n  var enterModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").enterModule;\n\n  enterModule && enterModule(module);\n})();\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\n// import jwt from 'jsonwebtoken'\nvar isServer = typeof window === 'undefined';\nexports.isServer = isServer;\n\nvar fetchData =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(path, jwToken) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt(\"return\", fetch(\"http://localhost:3000\".concat(path), {\n              headers: {\n                Accept: 'application/json',\n                Authorization: \"Bearer \".concat(jwToken || '')\n              }\n            }).then(function (data) {\n              return data.json();\n            }));\n\n          case 1:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this);\n  }));\n\n  return function fetchData(_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nexports.fetchData = fetchData;\n\nvar isAllowed = function isAllowed(type, state) {\n  var role = _routesMap.default[type] && _routesMap.default[type].role; // you can put arbitrary keys in routes\n\n  if (!role) return true;\n  var user = isServer ? jwt.verify(state.jwToken, Object({\"NODE_ENV\":\"development\"}).JWT_SECRET) : userFromState(state);\n  if (!user) return false;\n  return user.roles.includes(role);\n}; // VERIFICATION MOCK:\n// since middleware is syncrhonous you must use a jwt package that is sync\n// like the one imported above. For now we will mock both the client + server\n// verification methods:\n\n\nexports.isAllowed = isAllowed;\nvar fakeUser = {\n  roles: ['admin']\n};\n\nvar userFromState = function userFromState(_ref2) {\n  var jwToken = _ref2.jwToken,\n      user = _ref2.user;\n  return jwToken === 'real' && fakeUser;\n};\n\nvar jwt = {\n  verify: function verify(jwToken, secret) {\n    return jwToken === 'real' && fakeUser;\n  } // NOTE ON COOKIES:\n  // we're doing combination cookies + jwTokens because universal apps aren't\n  // single page apps (SPAs). Server-rendered requests, when triggered via\n  // direct visits by the user, do not have headers we can set. That's the\n  // takeaway.\n\n};\n;\n\n(function () {\n  var reactHotLoader = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").default;\n\n  var leaveModule = __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\").leaveModule;\n\n  if (!reactHotLoader) {\n    return;\n  }\n\n  reactHotLoader.register(isServer, \"isServer\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\utils.js\");\n  reactHotLoader.register(fetchData, \"fetchData\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\utils.js\");\n  reactHotLoader.register(isAllowed, \"isAllowed\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\utils.js\");\n  reactHotLoader.register(fakeUser, \"fakeUser\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\utils.js\");\n  reactHotLoader.register(userFromState, \"userFromState\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\utils.js\");\n  reactHotLoader.register(jwt, \"jwt\", \"C:\\\\Users\\\\nicov\\\\OneDrive\\\\Bureaublad\\\\Programming\\\\React\\\\redux-first-router-demo-master\\\\src\\\\utils.js\");\n  leaveModule(module);\n})();\n\n;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ }),

/***/ 0:
/*!******************************************************************************************************************************************************************************************!*\
  !*** multi @babel/polyfill fetch-everywhere webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false react-hot-loader/patch ./src/index.js ***!
  \******************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! @babel/polyfill */\"./node_modules/@babel/polyfill/lib/index.js\");\n__webpack_require__(/*! fetch-everywhere */\"./node_modules/fetch-everywhere/fetch-npm-browserify.js\");\n__webpack_require__(/*! webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false */\"./node_modules/webpack-hot-middleware/client.js?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false\");\n__webpack_require__(/*! react-hot-loader/patch */\"./node_modules/react-hot-loader/patch.js\");\nmodule.exports = __webpack_require__(/*! C:\\Users\\nicov\\OneDrive\\Bureaublad\\Programming\\React\\redux-first-router-demo-master\\src\\index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_@babel/polyfill_fetch-everywhere_webpack-hot-middleware/client?");

/***/ }),

/***/ "dll-reference vendor_dd3ff9292aed8397c480":
/*!**********************************************!*\
  !*** external "vendor_dd3ff9292aed8397c480" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = vendor_dd3ff9292aed8397c480;\n\n//# sourceURL=webpack:///external_%22vendor_dd3ff9292aed8397c480%22?");

/***/ })

/******/ });