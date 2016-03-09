var $jscomp = {scope:{}, getGlobal:function($maybeGlobal$$) {
  return "undefined" != typeof window && window === $maybeGlobal$$ ? $maybeGlobal$$ : "undefined" != typeof global ? global : $maybeGlobal$$;
}};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.initSymbol = function $$jscomp$initSymbol$() {
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
  $jscomp.initSymbol = function $$jscomp$initSymbol$() {
  };
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function $$jscomp$Symbol$($description$$) {
  return "jscomp_symbol_" + $description$$ + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  $jscomp.initSymbol();
  $jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  $jscomp.initSymbolIterator = function $$jscomp$initSymbolIterator$() {
  };
};
$jscomp.makeIterator = function $$jscomp$makeIterator$($iterable$$) {
  $jscomp.initSymbolIterator();
  if ($iterable$$[$jscomp.global.Symbol.iterator]) {
    return $iterable$$[$jscomp.global.Symbol.iterator]();
  }
  if (!($iterable$$ instanceof Array || "string" == typeof $iterable$$ || $iterable$$ instanceof String)) {
    throw new TypeError($iterable$$ + " is not iterable");
  }
  var $index$$ = 0;
  return {next:function() {
    return $index$$ == $iterable$$.length ? {done:!0} : {done:!1, value:$iterable$$[$index$$++]};
  }};
};
$jscomp.arrayFromIterator = function $$jscomp$arrayFromIterator$($iterator$$) {
  for (var $i$$, $arr$$ = [];!($i$$ = $iterator$$.next()).done;) {
    $arr$$.push($i$$.value);
  }
  return $arr$$;
};
$jscomp.arrayFromIterable = function $$jscomp$arrayFromIterable$($iterable$$) {
  return $iterable$$ instanceof Array ? $iterable$$ : $jscomp.arrayFromIterator($jscomp.makeIterator($iterable$$));
};
$jscomp.arrayFromArguments = function $$jscomp$arrayFromArguments$($args$$) {
  for (var $result$$ = [], $i$$ = 0;$i$$ < $args$$.length;$i$$++) {
    $result$$.push($args$$[$i$$]);
  }
  return $result$$;
};
$jscomp.inherits = function $$jscomp$inherits$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$;
  for (var $p$$ in $parentCtor$$) {
    if ($jscomp.global.Object.defineProperties) {
      var $descriptor$$ = $jscomp.global.Object.getOwnPropertyDescriptor($parentCtor$$, $p$$);
      $jscomp.global.Object.defineProperty($childCtor$$, $p$$, $descriptor$$);
    } else {
      $childCtor$$[$p$$] = $parentCtor$$[$p$$];
    }
  }
};
$jscomp.array = $jscomp.array || {};
$jscomp.array.done_ = function $$jscomp$array$done_$() {
  return {done:!0, value:void 0};
};
$jscomp.array.arrayIterator_ = function $$jscomp$array$arrayIterator_$($array$$, $func$$) {
  $array$$ instanceof String && ($array$$ = String($array$$));
  var $i$$ = 0;
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $$jscomp$compprop0$$ = {}, $iter$$ = ($$jscomp$compprop0$$.next = function $$$jscomp$compprop0$$$next$() {
    if ($i$$ < $array$$.length) {
      var $index$$ = $i$$++;
      return {value:$func$$($index$$, $array$$[$index$$]), done:!1};
    }
    $iter$$.next = $jscomp.array.done_;
    return $jscomp.array.done_();
  }, $$jscomp$compprop0$$[Symbol.iterator] = function $$$jscomp$compprop0$$$Symbol$iterator$() {
    return $iter$$;
  }, $$jscomp$compprop0$$);
  return $iter$$;
};
$jscomp.array.findInternal_ = function $$jscomp$array$findInternal_$($array$$, $callback$$, $thisArg$$) {
  $array$$ instanceof String && ($array$$ = String($array$$));
  for (var $len$$ = $array$$.length, $i$$ = 0;$i$$ < $len$$;$i$$++) {
    var $value$$ = $array$$[$i$$];
    if ($callback$$.call($thisArg$$, $value$$, $i$$, $array$$)) {
      return {i:$i$$, v:$value$$};
    }
  }
  return {i:-1, v:void 0};
};
$jscomp.array.from = function $$jscomp$array$from$($arrayLike$$1_iter$$, $opt_mapFn$$, $opt_thisArg$$) {
  $opt_mapFn$$ = void 0 === $opt_mapFn$$ ? function($x$$) {
    return $x$$;
  } : $opt_mapFn$$;
  var $result$$ = [];
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  if ($arrayLike$$1_iter$$[Symbol.iterator]) {
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    $arrayLike$$1_iter$$ = $arrayLike$$1_iter$$[Symbol.iterator]();
    for (var $len$$;!($len$$ = $arrayLike$$1_iter$$.next()).done;) {
      $result$$.push($opt_mapFn$$.call($opt_thisArg$$, $len$$.value));
    }
  } else {
    $len$$ = $arrayLike$$1_iter$$.length;
    for (var $i$$ = 0;$i$$ < $len$$;$i$$++) {
      $result$$.push($opt_mapFn$$.call($opt_thisArg$$, $arrayLike$$1_iter$$[$i$$]));
    }
  }
  return $result$$;
};
$jscomp.array.of = function $$jscomp$array$of$($elements$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
  }
  return $jscomp.array.from($$jscomp$restParams$$);
};
$jscomp.array.entries = function $$jscomp$array$entries$() {
  return $jscomp.array.arrayIterator_(this, function($i$$, $v$$) {
    return [$i$$, $v$$];
  });
};
$jscomp.array.entries$install = function $$jscomp$array$entries$install$() {
  Array.prototype.entries || (Array.prototype.entries = $jscomp.array.entries);
};
$jscomp.array.keys = function $$jscomp$array$keys$() {
  return $jscomp.array.arrayIterator_(this, function($i$$) {
    return $i$$;
  });
};
$jscomp.array.keys$install = function $$jscomp$array$keys$install$() {
  Array.prototype.keys || (Array.prototype.keys = $jscomp.array.keys);
};
$jscomp.array.values = function $$jscomp$array$values$() {
  return $jscomp.array.arrayIterator_(this, function($_$$, $v$$) {
    return $v$$;
  });
};
$jscomp.array.values$install = function $$jscomp$array$values$install$() {
  Array.prototype.values || (Array.prototype.values = $jscomp.array.values);
};
$jscomp.array.copyWithin = function $$jscomp$array$copyWithin$($target$$, $start$$, $opt_end$$) {
  var $len$$ = this.length;
  $target$$ = Number($target$$);
  $start$$ = Number($start$$);
  $opt_end$$ = Number(null != $opt_end$$ ? $opt_end$$ : $len$$);
  if ($target$$ < $start$$) {
    for ($opt_end$$ = Math.min($opt_end$$, $len$$);$start$$ < $opt_end$$;) {
      $start$$ in this ? this[$target$$++] = this[$start$$++] : (delete this[$target$$++], $start$$++);
    }
  } else {
    for ($opt_end$$ = Math.min($opt_end$$, $len$$ + $start$$ - $target$$), $target$$ += $opt_end$$ - $start$$;$opt_end$$ > $start$$;) {
      --$opt_end$$ in this ? this[--$target$$] = this[$opt_end$$] : delete this[$target$$];
    }
  }
  return this;
};
$jscomp.array.copyWithin$install = function $$jscomp$array$copyWithin$install$() {
  Array.prototype.copyWithin || (Array.prototype.copyWithin = $jscomp.array.copyWithin);
};
$jscomp.array.fill = function $$jscomp$array$fill$($value$$, $i$$, $opt_end$$) {
  null != $opt_end$$ && $value$$.length || ($opt_end$$ = this.length || 0);
  $opt_end$$ = Number($opt_end$$);
  for ($i$$ = Number((void 0 === $i$$ ? 0 : $i$$) || 0);$i$$ < $opt_end$$;$i$$++) {
    this[$i$$] = $value$$;
  }
  return this;
};
$jscomp.array.fill$install = function $$jscomp$array$fill$install$() {
  Array.prototype.fill || (Array.prototype.fill = $jscomp.array.fill);
};
$jscomp.array.find = function $$jscomp$array$find$($callback$$, $opt_thisArg$$) {
  return $jscomp.array.findInternal_(this, $callback$$, $opt_thisArg$$).v;
};
$jscomp.array.find$install = function $$jscomp$array$find$install$() {
  Array.prototype.find || (Array.prototype.find = $jscomp.array.find);
};
$jscomp.array.findIndex = function $$jscomp$array$findIndex$($callback$$, $opt_thisArg$$) {
  return $jscomp.array.findInternal_(this, $callback$$, $opt_thisArg$$).i;
};
$jscomp.array.findIndex$install = function $$jscomp$array$findIndex$install$() {
  Array.prototype.findIndex || (Array.prototype.findIndex = $jscomp.array.findIndex);
};
$jscomp.Map = function $$jscomp$Map$($$jscomp$iter$1_opt_iterable$$) {
  $$jscomp$iter$1_opt_iterable$$ = void 0 === $$jscomp$iter$1_opt_iterable$$ ? [] : $$jscomp$iter$1_opt_iterable$$;
  this.data_ = {};
  this.head_ = $jscomp.Map.createHead_();
  this.size = 0;
  if ($$jscomp$iter$1_opt_iterable$$) {
    $$jscomp$iter$1_opt_iterable$$ = $jscomp.makeIterator($$jscomp$iter$1_opt_iterable$$);
    for (var $$jscomp$key$item_item$$ = $$jscomp$iter$1_opt_iterable$$.next();!$$jscomp$key$item_item$$.done;$$jscomp$key$item_item$$ = $$jscomp$iter$1_opt_iterable$$.next()) {
      $$jscomp$key$item_item$$ = $$jscomp$key$item_item$$.value, this.set($$jscomp$key$item_item$$[0], $$jscomp$key$item_item$$[1]);
    }
  }
};
$jscomp.Map.checkBrowserConformance_ = function $$jscomp$Map$checkBrowserConformance_$() {
  var $Map$$ = $jscomp.global.Map;
  if (!$Map$$ || !$Map$$.prototype.entries || !Object.seal) {
    return !1;
  }
  try {
    var $key$$ = Object.seal({x:4}), $map$$ = new $Map$$($jscomp.makeIterator([[$key$$, "s"]]));
    if ("s" != $map$$.get($key$$) || 1 != $map$$.size || $map$$.get({x:4}) || $map$$.set({x:4}, "t") != $map$$ || 2 != $map$$.size) {
      return !1;
    }
    var $iter$$ = $map$$.entries(), $item$$ = $iter$$.next();
    if ($item$$.done || $item$$.value[0] != $key$$ || "s" != $item$$.value[1]) {
      return !1;
    }
    $item$$ = $iter$$.next();
    return $item$$.done || 4 != $item$$.value[0].x || "t" != $item$$.value[1] || !$iter$$.next().done ? !1 : !0;
  } catch ($err$$) {
    return !1;
  }
};
$jscomp.Map.createHead_ = function $$jscomp$Map$createHead_$() {
  var $head$$ = {};
  return $head$$.previous = $head$$.next = $head$$.head = $head$$;
};
$jscomp.Map.getId_ = function $$jscomp$Map$getId_$($obj$$) {
  if (!($obj$$ instanceof Object)) {
    return String($obj$$);
  }
  $jscomp.Map.key_ in $obj$$ || $obj$$ instanceof Object && Object.isExtensible && Object.isExtensible($obj$$) && $jscomp.Map.defineProperty_($obj$$, $jscomp.Map.key_, ++$jscomp.Map.index_);
  return $jscomp.Map.key_ in $obj$$ ? $obj$$[$jscomp.Map.key_] : " " + $obj$$;
};
$jscomp.Map.prototype.set = function $$jscomp$Map$$set$($key$$, $value$$) {
  var $$jscomp$destructuring$var0_entry$$ = this.maybeGetEntry_($key$$), $id$$ = $$jscomp$destructuring$var0_entry$$.id, $list$$ = $$jscomp$destructuring$var0_entry$$.list, $$jscomp$destructuring$var0_entry$$ = $$jscomp$destructuring$var0_entry$$.entry;
  $list$$ || ($list$$ = this.data_[$id$$] = []);
  $$jscomp$destructuring$var0_entry$$ ? $$jscomp$destructuring$var0_entry$$.value = $value$$ : ($$jscomp$destructuring$var0_entry$$ = {next:this.head_, previous:this.head_.previous, head:this.head_, key:$key$$, value:$value$$}, $list$$.push($$jscomp$destructuring$var0_entry$$), this.head_.previous.next = $$jscomp$destructuring$var0_entry$$, this.head_.previous = $$jscomp$destructuring$var0_entry$$, this.size++);
  return this;
};
$jscomp.Map.prototype["delete"] = function $$jscomp$Map$$delete$($id$$5_key$$) {
  var $$jscomp$destructuring$var1_entry$$ = this.maybeGetEntry_($id$$5_key$$);
  $id$$5_key$$ = $$jscomp$destructuring$var1_entry$$.id;
  var $list$$ = $$jscomp$destructuring$var1_entry$$.list, $index$$ = $$jscomp$destructuring$var1_entry$$.index;
  return ($$jscomp$destructuring$var1_entry$$ = $$jscomp$destructuring$var1_entry$$.entry) && $list$$ ? ($list$$.splice($index$$, 1), $list$$.length || delete this.data_[$id$$5_key$$], $$jscomp$destructuring$var1_entry$$.previous.next = $$jscomp$destructuring$var1_entry$$.next, $$jscomp$destructuring$var1_entry$$.next.previous = $$jscomp$destructuring$var1_entry$$.previous, $$jscomp$destructuring$var1_entry$$.head = null, this.size--, !0) : !1;
};
$jscomp.Map.prototype.clear = function $$jscomp$Map$$clear$() {
  this.data_ = {};
  this.head_ = this.head_.previous = $jscomp.Map.createHead_();
  this.size = 0;
};
$jscomp.Map.prototype.has = function $$jscomp$Map$$has$($key$$) {
  return !!this.maybeGetEntry_($key$$).entry;
};
$jscomp.Map.prototype.get = function $$jscomp$Map$$get$($entry$$2_key$$) {
  return ($entry$$2_key$$ = this.maybeGetEntry_($entry$$2_key$$).entry) && $entry$$2_key$$.value;
};
$jscomp.Map.prototype.maybeGetEntry_ = function $$jscomp$Map$$maybeGetEntry_$($key$$) {
  var $id$$ = $jscomp.Map.getId_($key$$), $list$$ = this.data_[$id$$];
  if ($list$$) {
    for (var $index$$ = 0;$index$$ < $list$$.length;$index$$++) {
      var $entry$$ = $list$$[$index$$];
      if ($key$$ !== $key$$ && $entry$$.key !== $entry$$.key || $key$$ === $entry$$.key) {
        return {id:$id$$, list:$list$$, index:$index$$, entry:$entry$$};
      }
    }
  }
  return {id:$id$$, list:$list$$, index:-1, entry:void 0};
};
$jscomp.Map.prototype.entries = function $$jscomp$Map$$entries$() {
  return this.iter_(function($entry$$) {
    return [$entry$$.key, $entry$$.value];
  });
};
$jscomp.Map.prototype.keys = function $$jscomp$Map$$keys$() {
  return this.iter_(function($entry$$) {
    return $entry$$.key;
  });
};
$jscomp.Map.prototype.values = function $$jscomp$Map$$values$() {
  return this.iter_(function($entry$$) {
    return $entry$$.value;
  });
};
$jscomp.Map.prototype.forEach = function $$jscomp$Map$$forEach$($callback$$, $opt_thisArg$$) {
  for (var $$jscomp$iter$2$$ = $jscomp.makeIterator(this.entries()), $$jscomp$key$entry_entry$$ = $$jscomp$iter$2$$.next();!$$jscomp$key$entry_entry$$.done;$$jscomp$key$entry_entry$$ = $$jscomp$iter$2$$.next()) {
    $$jscomp$key$entry_entry$$ = $$jscomp$key$entry_entry$$.value, $callback$$.call($opt_thisArg$$, $$jscomp$key$entry_entry$$[1], $$jscomp$key$entry_entry$$[0], this);
  }
};
$jscomp.Map.prototype.iter_ = function $$jscomp$Map$$iter_$($func$$) {
  var $map$$ = this, $entry$$ = this.head_;
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  var $$jscomp$compprop3$$ = {};
  return $$jscomp$compprop3$$.next = function $$$jscomp$compprop3$$$next$() {
    if ($entry$$) {
      for (;$entry$$.head != $map$$.head_;) {
        $entry$$ = $entry$$.previous;
      }
      for (;$entry$$.next != $entry$$.head;) {
        return $entry$$ = $entry$$.next, {done:!1, value:$func$$($entry$$)};
      }
      $entry$$ = null;
    }
    return {done:!0, value:void 0};
  }, $$jscomp$compprop3$$[Symbol.iterator] = function $$$jscomp$compprop3$$$Symbol$iterator$() {
    return this;
  }, $$jscomp$compprop3$$;
};
$jscomp.Map.index_ = 0;
$jscomp.Map.defineProperty_ = Object.defineProperty ? function($obj$$, $key$$, $value$$) {
  Object.defineProperty($obj$$, $key$$, {value:String($value$$)});
} : function($obj$$, $key$$, $value$$) {
  $obj$$[$key$$] = String($value$$);
};
$jscomp.Map.Entry_ = function $$jscomp$Map$Entry_$() {
};
$jscomp.Map.ASSUME_NO_NATIVE = !1;
$jscomp.Map$install = function $$jscomp$Map$install$() {
  $jscomp.initSymbol();
  $jscomp.initSymbolIterator();
  !$jscomp.Map.ASSUME_NO_NATIVE && $jscomp.Map.checkBrowserConformance_() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, $jscomp.initSymbol(), $jscomp.Map.key_ = Symbol("map-id-key"));
  $jscomp.Map$install = function $$jscomp$Map$install$() {
  };
};
$jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function $$jscomp$math$clz32$($x$$) {
  $x$$ = Number($x$$) >>> 0;
  if (0 === $x$$) {
    return 32;
  }
  var $result$$ = 0;
  0 === ($x$$ & 4294901760) && ($x$$ <<= 16, $result$$ += 16);
  0 === ($x$$ & 4278190080) && ($x$$ <<= 8, $result$$ += 8);
  0 === ($x$$ & 4026531840) && ($x$$ <<= 4, $result$$ += 4);
  0 === ($x$$ & 3221225472) && ($x$$ <<= 2, $result$$ += 2);
  0 === ($x$$ & 2147483648) && $result$$++;
  return $result$$;
};
$jscomp.math.imul = function $$jscomp$math$imul$($a$$, $b$$) {
  $a$$ = Number($a$$);
  $b$$ = Number($b$$);
  var $al$$ = $a$$ & 65535, $bl$$ = $b$$ & 65535;
  return $al$$ * $bl$$ + (($a$$ >>> 16 & 65535) * $bl$$ + $al$$ * ($b$$ >>> 16 & 65535) << 16 >>> 0) | 0;
};
$jscomp.math.sign = function $$jscomp$math$sign$($x$$) {
  $x$$ = Number($x$$);
  return 0 === $x$$ || isNaN($x$$) ? $x$$ : 0 < $x$$ ? 1 : -1;
};
$jscomp.math.log10 = function $$jscomp$math$log10$($x$$) {
  return Math.log($x$$) / Math.LN10;
};
$jscomp.math.log2 = function $$jscomp$math$log2$($x$$) {
  return Math.log($x$$) / Math.LN2;
};
$jscomp.math.log1p = function $$jscomp$math$log1p$($x$$) {
  $x$$ = Number($x$$);
  if (.25 > $x$$ && -.25 < $x$$) {
    for (var $y$$ = $x$$, $d$$ = 1, $z$$ = $x$$, $zPrev$$ = 0, $s$$ = 1;$zPrev$$ != $z$$;) {
      $y$$ *= $x$$, $s$$ *= -1, $z$$ = ($zPrev$$ = $z$$) + $s$$ * $y$$ / ++$d$$;
    }
    return $z$$;
  }
  return Math.log(1 + $x$$);
};
$jscomp.math.expm1 = function $$jscomp$math$expm1$($x$$) {
  $x$$ = Number($x$$);
  if (.25 > $x$$ && -.25 < $x$$) {
    for (var $y$$ = $x$$, $d$$ = 1, $z$$ = $x$$, $zPrev$$ = 0;$zPrev$$ != $z$$;) {
      $y$$ *= $x$$ / ++$d$$, $z$$ = ($zPrev$$ = $z$$) + $y$$;
    }
    return $z$$;
  }
  return Math.exp($x$$) - 1;
};
$jscomp.math.cosh = function $$jscomp$math$cosh$($x$$) {
  $x$$ = Number($x$$);
  return (Math.exp($x$$) + Math.exp(-$x$$)) / 2;
};
$jscomp.math.sinh = function $$jscomp$math$sinh$($x$$) {
  $x$$ = Number($x$$);
  return 0 === $x$$ ? $x$$ : (Math.exp($x$$) - Math.exp(-$x$$)) / 2;
};
$jscomp.math.tanh = function $$jscomp$math$tanh$($x$$) {
  $x$$ = Number($x$$);
  if (0 === $x$$) {
    return $x$$;
  }
  var $y$$44_z$$ = Math.exp(2 * -Math.abs($x$$)), $y$$44_z$$ = (1 - $y$$44_z$$) / (1 + $y$$44_z$$);
  return 0 > $x$$ ? -$y$$44_z$$ : $y$$44_z$$;
};
$jscomp.math.acosh = function $$jscomp$math$acosh$($x$$) {
  $x$$ = Number($x$$);
  return Math.log($x$$ + Math.sqrt($x$$ * $x$$ - 1));
};
$jscomp.math.asinh = function $$jscomp$math$asinh$($x$$) {
  $x$$ = Number($x$$);
  if (0 === $x$$) {
    return $x$$;
  }
  var $y$$ = Math.log(Math.abs($x$$) + Math.sqrt($x$$ * $x$$ + 1));
  return 0 > $x$$ ? -$y$$ : $y$$;
};
$jscomp.math.atanh = function $$jscomp$math$atanh$($x$$) {
  $x$$ = Number($x$$);
  return ($jscomp.math.log1p($x$$) - $jscomp.math.log1p(-$x$$)) / 2;
};
$jscomp.math.hypot = function $$jscomp$math$hypot$($x$$, $y$$, $rest$$) {
  for (var $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$ = [], $$jscomp$key$z_$jscomp$restIndex$$ = 2;$$jscomp$key$z_$jscomp$restIndex$$ < arguments.length;++$$jscomp$key$z_$jscomp$restIndex$$) {
    $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$[$$jscomp$key$z_$jscomp$restIndex$$ - 2] = arguments[$$jscomp$key$z_$jscomp$restIndex$$];
  }
  $x$$ = Number($x$$);
  $y$$ = Number($y$$);
  for (var $max_sum$13$$ = Math.max(Math.abs($x$$), Math.abs($y$$)), $$jscomp$iter$4_sum$$ = $jscomp.makeIterator($$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$), $$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$iter$4_sum$$.next();!$$jscomp$key$z_$jscomp$restIndex$$.done;$$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$iter$4_sum$$.next()) {
    $max_sum$13$$ = Math.max($max_sum$13$$, Math.abs($$jscomp$key$z_$jscomp$restIndex$$.value));
  }
  if (1E100 < $max_sum$13$$ || 1E-100 > $max_sum$13$$) {
    $x$$ /= $max_sum$13$$;
    $y$$ /= $max_sum$13$$;
    $$jscomp$iter$4_sum$$ = $x$$ * $x$$ + $y$$ * $y$$;
    $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$ = $jscomp.makeIterator($$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$);
    for ($$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$.next();!$$jscomp$key$z_$jscomp$restIndex$$.done;$$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$.next()) {
      $$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$key$z_$jscomp$restIndex$$.value, $$jscomp$key$z_$jscomp$restIndex$$ = Number($$jscomp$key$z_$jscomp$restIndex$$) / $max_sum$13$$, $$jscomp$iter$4_sum$$ += $$jscomp$key$z_$jscomp$restIndex$$ * $$jscomp$key$z_$jscomp$restIndex$$;
    }
    return Math.sqrt($$jscomp$iter$4_sum$$) * $max_sum$13$$;
  }
  $max_sum$13$$ = $x$$ * $x$$ + $y$$ * $y$$;
  $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$ = $jscomp.makeIterator($$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$);
  for ($$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$.next();!$$jscomp$key$z_$jscomp$restIndex$$.done;$$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$iter$5_$jscomp$iter$6_$jscomp$restParams$$.next()) {
    $$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$key$z_$jscomp$restIndex$$.value, $max_sum$13$$ += $$jscomp$key$z_$jscomp$restIndex$$ * $$jscomp$key$z_$jscomp$restIndex$$;
  }
  return Math.sqrt($max_sum$13$$);
};
$jscomp.math.trunc = function $$jscomp$math$trunc$($x$$) {
  $x$$ = Number($x$$);
  if (isNaN($x$$) || Infinity === $x$$ || -Infinity === $x$$ || 0 === $x$$) {
    return $x$$;
  }
  var $y$$ = Math.floor(Math.abs($x$$));
  return 0 > $x$$ ? -$y$$ : $y$$;
};
$jscomp.math.cbrt = function $$jscomp$math$cbrt$($x$$) {
  if (0 === $x$$) {
    return $x$$;
  }
  $x$$ = Number($x$$);
  var $y$$ = Math.pow(Math.abs($x$$), 1 / 3);
  return 0 > $x$$ ? -$y$$ : $y$$;
};
$jscomp.number = $jscomp.number || {};
$jscomp.number.isFinite = function $$jscomp$number$isFinite$($x$$) {
  return "number" !== typeof $x$$ ? !1 : !isNaN($x$$) && Infinity !== $x$$ && -Infinity !== $x$$;
};
$jscomp.number.isInteger = function $$jscomp$number$isInteger$($x$$) {
  return $jscomp.number.isFinite($x$$) ? $x$$ === Math.floor($x$$) : !1;
};
$jscomp.number.isNaN = function $$jscomp$number$isNaN$($x$$) {
  return "number" === typeof $x$$ && isNaN($x$$);
};
$jscomp.number.isSafeInteger = function $$jscomp$number$isSafeInteger$($x$$) {
  return $jscomp.number.isInteger($x$$) && Math.abs($x$$) <= $jscomp.number.MAX_SAFE_INTEGER;
};
$jscomp.number.EPSILON = Math.pow(2, -52);
$jscomp.number.MAX_SAFE_INTEGER = 9007199254740991;
$jscomp.number.MIN_SAFE_INTEGER = -9007199254740991;
$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function $$jscomp$object$assign$($target$$, $sources$$) {
  for (var $$jscomp$iter$7_$jscomp$restParams$$ = [], $$jscomp$key$source_$jscomp$restIndex$$2_source$$ = 1;$$jscomp$key$source_$jscomp$restIndex$$2_source$$ < arguments.length;++$$jscomp$key$source_$jscomp$restIndex$$2_source$$) {
    $$jscomp$iter$7_$jscomp$restParams$$[$$jscomp$key$source_$jscomp$restIndex$$2_source$$ - 1] = arguments[$$jscomp$key$source_$jscomp$restIndex$$2_source$$];
  }
  $$jscomp$iter$7_$jscomp$restParams$$ = $jscomp.makeIterator($$jscomp$iter$7_$jscomp$restParams$$);
  for ($$jscomp$key$source_$jscomp$restIndex$$2_source$$ = $$jscomp$iter$7_$jscomp$restParams$$.next();!$$jscomp$key$source_$jscomp$restIndex$$2_source$$.done;$$jscomp$key$source_$jscomp$restIndex$$2_source$$ = $$jscomp$iter$7_$jscomp$restParams$$.next()) {
    var $$jscomp$key$source_$jscomp$restIndex$$2_source$$ = $$jscomp$key$source_$jscomp$restIndex$$2_source$$.value, $key$$;
    for ($key$$ in $$jscomp$key$source_$jscomp$restIndex$$2_source$$) {
      Object.prototype.hasOwnProperty.call($$jscomp$key$source_$jscomp$restIndex$$2_source$$, $key$$) && ($target$$[$key$$] = $$jscomp$key$source_$jscomp$restIndex$$2_source$$[$key$$]);
    }
  }
  return $target$$;
};
$jscomp.object.is = function $$jscomp$object$is$($left$$, $right$$) {
  return $left$$ === $right$$ ? 0 !== $left$$ || 1 / $left$$ === 1 / $right$$ : $left$$ !== $left$$ && $right$$ !== $right$$;
};
$jscomp.Set = function $$jscomp$Set$($$jscomp$iter$8_opt_iterable$$) {
  $$jscomp$iter$8_opt_iterable$$ = void 0 === $$jscomp$iter$8_opt_iterable$$ ? [] : $$jscomp$iter$8_opt_iterable$$;
  this.map_ = new $jscomp.Map;
  if ($$jscomp$iter$8_opt_iterable$$) {
    $$jscomp$iter$8_opt_iterable$$ = $jscomp.makeIterator($$jscomp$iter$8_opt_iterable$$);
    for (var $$jscomp$key$item$$ = $$jscomp$iter$8_opt_iterable$$.next();!$$jscomp$key$item$$.done;$$jscomp$key$item$$ = $$jscomp$iter$8_opt_iterable$$.next()) {
      this.add($$jscomp$key$item$$.value);
    }
  }
  this.size = this.map_.size;
};
$jscomp.Set.checkBrowserConformance_ = function $$jscomp$Set$checkBrowserConformance_$() {
  var $Set$$1_iter$$ = $jscomp.global.Set;
  if (!$Set$$1_iter$$ || !$Set$$1_iter$$.prototype.entries || !Object.seal) {
    return !1;
  }
  var $value$$ = Object.seal({x:4}), $Set$$1_iter$$ = new $Set$$1_iter$$($jscomp.makeIterator([$value$$]));
  if ($Set$$1_iter$$.has($value$$) || 1 != $Set$$1_iter$$.size || $Set$$1_iter$$.add($value$$) != $Set$$1_iter$$ || 1 != $Set$$1_iter$$.size || $Set$$1_iter$$.add({x:4}) != $Set$$1_iter$$ || 2 != $Set$$1_iter$$.size) {
    return !1;
  }
  var $Set$$1_iter$$ = $Set$$1_iter$$.entries(), $item$$ = $Set$$1_iter$$.next();
  if ($item$$.done || $item$$.value[0] != $value$$ || $item$$.value[1] != $value$$) {
    return !1;
  }
  $item$$ = $Set$$1_iter$$.next();
  return $item$$.done || $item$$.value[0] == $value$$ || 4 != $item$$.value[0].x || $item$$.value[1] != $item$$.value[0] ? !1 : $Set$$1_iter$$.next().done;
};
$jscomp.Set.prototype.add = function $$jscomp$Set$$add$($value$$) {
  this.map_.set($value$$, $value$$);
  this.size = this.map_.size;
  return this;
};
$jscomp.Set.prototype["delete"] = function $$jscomp$Set$$delete$($result$$3_value$$) {
  $result$$3_value$$ = this.map_["delete"]($result$$3_value$$);
  this.size = this.map_.size;
  return $result$$3_value$$;
};
$jscomp.Set.prototype.clear = function $$jscomp$Set$$clear$() {
  this.map_.clear();
  this.size = 0;
};
$jscomp.Set.prototype.has = function $$jscomp$Set$$has$($value$$) {
  return this.map_.has($value$$);
};
$jscomp.Set.prototype.entries = function $$jscomp$Set$$entries$() {
  return this.map_.entries();
};
$jscomp.Set.prototype.values = function $$jscomp$Set$$values$() {
  return this.map_.values();
};
$jscomp.Set.prototype.forEach = function $$jscomp$Set$$forEach$($callback$$, $opt_thisArg$$) {
  var $$jscomp$this$$ = this;
  this.map_.forEach(function($value$$) {
    return $callback$$.call($opt_thisArg$$, $value$$, $value$$, $$jscomp$this$$);
  });
};
$jscomp.Set.ASSUME_NO_NATIVE = !1;
$jscomp.Set$install = function $$jscomp$Set$install$() {
  !$jscomp.Set.ASSUME_NO_NATIVE && $jscomp.Set.checkBrowserConformance_() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.Map$install(), $jscomp.initSymbol(), $jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values);
  $jscomp.Set$install = function $$jscomp$Set$install$() {
  };
};
$jscomp.string = $jscomp.string || {};
$jscomp.string.noRegExp_ = function $$jscomp$string$noRegExp_$($str$$, $func$$) {
  if ($str$$ instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + $func$$ + " must not be a regular expression");
  }
};
$jscomp.string.fromCodePoint = function $$jscomp$string$fromCodePoint$($codepoints$$) {
  for (var $$jscomp$iter$9_$jscomp$restParams$$ = [], $$jscomp$restIndex$$3_result$$ = 0;$$jscomp$restIndex$$3_result$$ < arguments.length;++$$jscomp$restIndex$$3_result$$) {
    $$jscomp$iter$9_$jscomp$restParams$$[$$jscomp$restIndex$$3_result$$ - 0] = arguments[$$jscomp$restIndex$$3_result$$];
  }
  for (var $$jscomp$restIndex$$3_result$$ = "", $$jscomp$iter$9_$jscomp$restParams$$ = $jscomp.makeIterator($$jscomp$iter$9_$jscomp$restParams$$), $$jscomp$key$code_code$$ = $$jscomp$iter$9_$jscomp$restParams$$.next();!$$jscomp$key$code_code$$.done;$$jscomp$key$code_code$$ = $$jscomp$iter$9_$jscomp$restParams$$.next()) {
    $$jscomp$key$code_code$$ = $$jscomp$key$code_code$$.value;
    $$jscomp$key$code_code$$ = +$$jscomp$key$code_code$$;
    if (0 > $$jscomp$key$code_code$$ || 1114111 < $$jscomp$key$code_code$$ || $$jscomp$key$code_code$$ !== Math.floor($$jscomp$key$code_code$$)) {
      throw new RangeError("invalid_code_point " + $$jscomp$key$code_code$$);
    }
    65535 >= $$jscomp$key$code_code$$ ? $$jscomp$restIndex$$3_result$$ += String.fromCharCode($$jscomp$key$code_code$$) : ($$jscomp$key$code_code$$ -= 65536, $$jscomp$restIndex$$3_result$$ += String.fromCharCode($$jscomp$key$code_code$$ >>> 10 & 1023 | 55296), $$jscomp$restIndex$$3_result$$ += String.fromCharCode($$jscomp$key$code_code$$ & 1023 | 56320));
  }
  return $$jscomp$restIndex$$3_result$$;
};
$jscomp.string.repeat = function $$jscomp$string$repeat$($copies$$) {
  var $string$$ = this.toString();
  if (0 > $copies$$ || 1342177279 < $copies$$) {
    throw new RangeError("Invalid count value");
  }
  $copies$$ |= 0;
  for (var $result$$ = "";$copies$$;) {
    if ($copies$$ & 1 && ($result$$ += $string$$), $copies$$ >>>= 1) {
      $string$$ += $string$$;
    }
  }
  return $result$$;
};
$jscomp.string.repeat$install = function $$jscomp$string$repeat$install$() {
  String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat);
};
$jscomp.string.codePointAt = function $$jscomp$string$codePointAt$($position_second$$) {
  var $string$$ = this.toString(), $size$$ = $string$$.length;
  $position_second$$ = Number($position_second$$) || 0;
  if (0 <= $position_second$$ && $position_second$$ < $size$$) {
    $position_second$$ |= 0;
    var $first$$ = $string$$.charCodeAt($position_second$$);
    if (55296 > $first$$ || 56319 < $first$$ || $position_second$$ + 1 === $size$$) {
      return $first$$;
    }
    $position_second$$ = $string$$.charCodeAt($position_second$$ + 1);
    return 56320 > $position_second$$ || 57343 < $position_second$$ ? $first$$ : 1024 * ($first$$ - 55296) + $position_second$$ + 9216;
  }
};
$jscomp.string.codePointAt$install = function $$jscomp$string$codePointAt$install$() {
  String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt);
};
$jscomp.string.includes = function $$jscomp$string$includes$($searchString$$, $opt_position$$) {
  $opt_position$$ = void 0 === $opt_position$$ ? 0 : $opt_position$$;
  $jscomp.string.noRegExp_($searchString$$, "includes");
  return -1 !== this.toString().indexOf($searchString$$, $opt_position$$);
};
$jscomp.string.includes$install = function $$jscomp$string$includes$install$() {
  String.prototype.includes || (String.prototype.includes = $jscomp.string.includes);
};
$jscomp.string.startsWith = function $$jscomp$string$startsWith$($searchString$$, $opt_position$$) {
  $opt_position$$ = void 0 === $opt_position$$ ? 0 : $opt_position$$;
  $jscomp.string.noRegExp_($searchString$$, "startsWith");
  var $string$$ = this.toString();
  $searchString$$ += "";
  for (var $strLen$$ = $string$$.length, $searchLen$$ = $searchString$$.length, $i$$ = Math.max(0, Math.min($opt_position$$ | 0, $string$$.length)), $j$$ = 0;$j$$ < $searchLen$$ && $i$$ < $strLen$$;) {
    if ($string$$[$i$$++] != $searchString$$[$j$$++]) {
      return !1;
    }
  }
  return $j$$ >= $searchLen$$;
};
$jscomp.string.startsWith$install = function $$jscomp$string$startsWith$install$() {
  String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith);
};
$jscomp.string.endsWith = function $$jscomp$string$endsWith$($searchString$$, $opt_position$$) {
  $jscomp.string.noRegExp_($searchString$$, "endsWith");
  var $string$$ = this.toString();
  $searchString$$ += "";
  void 0 === $opt_position$$ && ($opt_position$$ = $string$$.length);
  for (var $i$$ = Math.max(0, Math.min($opt_position$$ | 0, $string$$.length)), $j$$ = $searchString$$.length;0 < $j$$ && 0 < $i$$;) {
    if ($string$$[--$i$$] != $searchString$$[--$j$$]) {
      return !1;
    }
  }
  return 0 >= $j$$;
};
$jscomp.string.endsWith$install = function $$jscomp$string$endsWith$install$() {
  String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith);
};
(function($global$$0$$, $alias$$) {
  function $_bootstrap$$($global$$) {
    var $js$$ = $global$$.jspyder = function jspyder() {
    };
    $js$$.extend = function js_extend($name$$, $obj$$) {
      Object.defineProperty(this, $name$$, {value:$obj$$});
      return this;
    };
    $js$$.extend.fn = function js_extend_fn($name$$, $fn$$, $args$$) {
      $js$$.extend($name$$, $fn$$.apply($js$$, $args$$));
      return this;
    };
    $js$$.createRegistry = $_createRegistry$$;
    $js$$.registry = $_createRegistry$$();
    $_bootstrapLog$$($js$$);
    $_bootstrapEnv$$($js$$);
    $_bootstrapLib$$($js$$);
    $_bootstrapAlg$$($js$$);
    $_bootstrapDom$$($js$$);
    $js$$.loadScript = function $$js$$$loadScript$($url$$) {
      $js$$.ajax($url$$).get(function($data$$) {
        (new Function($data$$.responseText))();
      });
    };
    return $js$$;
  }
  function $_bootstrapLog$$($js$$) {
    function $log$$($level$$, $text$$) {
      var $args$$ = $js$$.alg.sliceArray(arguments, 1 < arguments.length ? 1 : 0), $err$$, $warn$$, $log$$;
      if (1 === arguments.length || arguments) {
        $level$$ = 0;
      }
      console && ($log$$ = console.log || function() {
      }, $warn$$ = console.warn || $log$$, $err$$ = console.error || $err$$, 2 === $level$$ ? $js$$.alg.use(console, $err$$, $args$$) : 1 === $level$$ ? $js$$.alg.use(console, $warn$$, $args$$) : $js$$.alg.use(console, $log$$, $args$$));
      return this;
    }
    $log$$.err = function $$log$$$err$($text$$) {
      $js$$.alg.use($js$$, $log$$, [2].concat($js$$.alg.sliceArray(arguments, 0)));
      return this;
    };
    $log$$.warn = function $$log$$$warn$($text$$) {
      $js$$.alg.use($js$$, $log$$, [1].concat($js$$.alg.sliceArray(arguments, 0)));
      return this;
    };
    $js$$.extend("log", $log$$);
  }
  function $_bootstrapEnv$$($js$$) {
    var $BROWSER_NAME$$ = "", $BROWSER_VERSION$$ = 0;
    (function _detectBrowser() {
      $document$$.documentMode ? ($BROWSER_NAME$$ = "IE", $BROWSER_VERSION$$ = window.attachEvent ? eval("/*@cc_on (document.documentMode == 10)!=@*/false") ? 10 : window.requestAnimationFrame ? window.addEventListener ? 7 : 8 : 9 : 11) : "undefined" !== typeof window.InstallTrigger ? ($BROWSER_NAME$$ = "Firefox", $BROWSER_VERSION$$ = Int8Array && Int8Array.prototype.sort ? 7 : Node.innerText ? 45 : Document.charset ? 44 : Array.prototype.includes ? 43 : "undefined" !== typeof window.Reflect ? 42 : 
      41) : window.opera || 0 <= navigator.userAgent.indexOf(" OPR/") ? ($BROWSER_NAME$$ = "Opera", $BROWSER_VERSION$$ = 1) : window.chrome ? ($BROWSER_NAME$$ = "Chrome", $BROWSER_VERSION$$ = 45) : 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") ? ($BROWSER_NAME$$ = "Safari", window.CSS.supports ? $BROWSER_VERSION$$ = 9 : window.CSS.supports || ($BROWSER_VERSION$$ = 8)) : window.MSInputMethodContext ? ($BROWSER_NAME$$ = "Edge", $jscomp.initSymbol(), $BROWSER_VERSION$$ = 
      "{}" === JSON.stringify({foo:Symbol()}) ? 13 : window.RTCIceGatherOptions ? 11 : 12) : /iP(ad|hone|od)/.test(navigator.userAgent) ? ($BROWSER_NAME$$ = "iOS Safari", $BROWSER_VERSION$$ = 8.4) : window.operamini ? ($BROWSER_NAME$$ = "Opera Mini", $BROWSER_VERSION$$ = 8) : /Android.*Mozilla\/5.0.*AppleWebKit/.test(navigator.userAgent) ? ($BROWSER_NAME$$ = "Android Browser", $BROWSER_VERSION$$ = 4.3) : /Android.*Chrome/.test(navigator.userAgent) && ($BROWSER_NAME$$ = "Chrome for Android", $BROWSER_VERSION$$ = 
      47);
    })();
    var $__browser_js_env$$ = {name:$BROWSER_NAME$$, version:$BROWSER_VERSION$$, toString:function() {
      return this.name + this.version;
    }};
    Object.freeze($__browser_js_env$$);
    $__browser_js_env$$ = {version:"0.0.0", versionNo:0, browser:$__browser_js_env$$};
    Object.freeze($__browser_js_env$$);
    $js$$.extend("env", $__browser_js_env$$);
  }
  function $_bootstrapAlg$$($js$$) {
    var $js_alg$$;
    if ($js$$.alg) {
      return $js$$.alg;
    }
    $js_alg$$ = {each:function each($obj$$, $fn$$, $data$$) {
      var $ctl$$ = {stop:function() {
        $_break$$ = !0;
        return this;
      }, drop:function($n$$) {
        return this;
      }}, $_break$$ = !1;
      if ($obj$$ && "object" === typeof $obj$$) {
        for (var $i$$ in $obj$$) {
          if ($fn$$.apply($ctl$$, [$obj$$[$i$$], $i$$, $obj$$, $data$$]), $_break$$) {
            break;
          }
        }
      }
      return $js$$;
    }, arrEach:function each($obj$$, $fn$$, $data$$) {
      var $ctl$$ = {stop:function() {
        $_break$$ = !0;
        return this;
      }, drop:function($n$$) {
        $obj$$ instanceof Array && $obj$$.splice($i$$--, $js$$.alg.number($n$$, 1));
        return this;
      }}, $_break$$ = !1;
      if ($obj$$ && "object" === typeof $obj$$) {
        for (var $i$$ = 0;$i$$ < $obj$$.length && ($fn$$.apply($ctl$$, [$obj$$[$i$$], $i$$, $obj$$, $data$$]), !$_break$$);$i$$++) {
        }
      }
      return $js$$;
    }, iterate:function $$js_alg$$$iterate$($i$$15_start$$, $end$$, $fn$$, $data$$) {
      $i$$15_start$$ = $js$$.alg.number($i$$15_start$$);
      $end$$ = $js$$.alg.number($end$$);
      for (var $ctl$$ = {stop:function() {
        $_break$$ = !0;
        return this;
      }, drop:function($n$$) {
        return this;
      }}, $_break$$ = !1, $step$$ = $end$$ < $i$$15_start$$ ? -1 : 1;$i$$15_start$$ !== $end$$ && ($fn$$.apply($ctl$$, [$i$$15_start$$, $data$$]), !$_break$$);$i$$15_start$$ += $step$$) {
      }
      return $js$$;
    }, magnitude:function $$js_alg$$$magnitude$($n$$) {
      $n$$ = $js$$.alg.number($n$$);
      var $y$$ = Math.pow(10, ($n$$ | 0).toString().length - 1);
      return Math.ceil($n$$ / $y$$) * $y$$;
    }, escapeString:function $$js_alg$$$escapeString$($str$$) {
      return $str$$.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }, use:function $$js_alg$$$use$($_this$$, $fn$$, $args$$) {
      $_this$$ || ($_this$$ = null);
      return "function" === typeof $fn$$ ? $fn$$.apply($_this$$, $args$$) : void 0;
    }, run:function $$js_alg$$$run$($fn$$) {
      "function" === typeof $fn$$ && $fn$$();
      return this;
    }, bool:function bool($b$$, $d$$) {
      switch(typeof $b$$) {
        case "undefined":
          return $d$$ || !1;
        case "string":
          return /true/i.test($b$$);
      }
      return $b$$ ? !0 : !1;
    }, number:function $$js_alg$$$number$($n$$, $d$$) {
      var $_n$$ = +$n$$;
      return $_n$$ == $n$$ || $_n$$ === $_n$$ ? $_n$$ : $d$$ || 0;
    }, string:function $$js_alg$$$string$($s$$, $d$$) {
      return "string" === typeof $s$$ ? $s$$ : $s$$ || 0 === $s$$ ? "" + $s$$ : $d$$ || "";
    }, object:function $$js_alg$$$object$($o$$, $d$$) {
      return $o$$ && "object" === typeof $o$$ ? $o$$ : $d$$ || {};
    }, date:function $$js_alg$$$date$($v$$, $d$$) {
      return input instanceof Date || "[object Date]" === Object.prototype.toString.call(input) ? $v$$ : new Date;
    }, byte:function $$js_alg$$$byte$($u$$) {
      if ("undefined" === typeof Int8Array) {
        $u$$ = +$u$$;
        for ($u$$ = ($u$$ === $u$$ ? $u$$ : 0) & 255;-128 > $u$$;) {
          $u$$ += 256;
        }
        for (;127 < $u$$;) {
          $u$$ -= 256;
        }
        return $u$$;
      }
      var $buffer$$ = new ArrayBuffer(1), $buffer$$ = new Int8Array($buffer$$);
      $buffer$$[0] = $u$$;
      return $buffer$$[0];
    }, ubyte:function $$js_alg$$$ubyte$($u$$) {
      if ("undefined" === typeof Uint8Array) {
        return $u$$ = +$u$$, ($u$$ === $u$$ ? $u$$ : 0) & 255;
      }
      var $buffer$$10_byteArray$$ = new ArrayBuffer(1), $buffer$$10_byteArray$$ = new Uint8Array($buffer$$10_byteArray$$);
      $buffer$$10_byteArray$$[0] = $u$$;
      return $buffer$$10_byteArray$$[0];
    }, short:function $$js_alg$$$short$($u$$) {
      if ("undefined" === typeof Int16Array) {
        $u$$ = +$u$$;
        for ($u$$ = ($u$$ === $u$$ ? $u$$ : 0) & 65535;-32768 > $u$$;) {
          $u$$ += 65536;
        }
        for (;32767 < $u$$;) {
          $u$$ -= 65536;
        }
        return $u$$;
      }
      var $buffer$$11_byteArray$$ = new ArrayBuffer(2), $buffer$$11_byteArray$$ = new Int16Array($buffer$$11_byteArray$$);
      $buffer$$11_byteArray$$[0] = $u$$;
      return $buffer$$11_byteArray$$[0];
    }, ushort:function $$js_alg$$$ushort$($u$$) {
      if ("undefined" === typeof Uint16Array) {
        return $u$$ = +$u$$, ($u$$ === $u$$ ? $u$$ : 0) & 65535;
      }
      var $buffer$$12_byteArray$$ = new ArrayBuffer(2), $buffer$$12_byteArray$$ = new Uint16Array($buffer$$12_byteArray$$);
      $buffer$$12_byteArray$$[0] = $u$$;
      return $buffer$$12_byteArray$$[0];
    }, int:function $$js_alg$$$int$($u$$) {
      if ("undefined" === typeof Int32Array) {
        $u$$ = +$u$$;
        for ($u$$ = ($u$$ === $u$$ ? $u$$ : 0) & 4294967295;-2147483648 > $u$$;) {
          $u$$ += 4294967296;
        }
        for (;2147483647 < $u$$;) {
          $u$$ -= 4294967296;
        }
        return $u$$;
      }
      var $buffer$$13_byteArray$$ = new ArrayBuffer(4), $buffer$$13_byteArray$$ = new Int32Array($buffer$$13_byteArray$$);
      $buffer$$13_byteArray$$[0] = $u$$;
      return $buffer$$13_byteArray$$[0];
    }, uint:function $$js_alg$$$uint$($u$$) {
      if ("undefined" === typeof Int32Array) {
        return $u$$ = +$u$$, $u$$ = ($u$$ === $u$$ ? $u$$ : 0) % 4294967296, 0 > $u$$ ? -1 * $u$$ : $u$$;
      }
      var $buffer$$14_byteArray$$ = new ArrayBuffer(4), $buffer$$14_byteArray$$ = new Uint32Array($buffer$$14_byteArray$$);
      $buffer$$14_byteArray$$[0] = $u$$;
      return $buffer$$14_byteArray$$[0];
    }, float:function $$js_alg$$$float$($u$$) {
      if ("undefined" === typeof Float32Array) {
        return $u$$ = +(+$u$$).toPrecision(8), $u$$ == $u$$ ? $u$$ : 0;
      }
      var $buffer$$15_byteArray$$ = new ArrayBuffer(4), $buffer$$15_byteArray$$ = new Float32Array($buffer$$15_byteArray$$);
      $buffer$$15_byteArray$$[0] = $u$$;
      return +$buffer$$15_byteArray$$[0].toPrecision(8);
    }, double:function $$js_alg$$$double$($u$$) {
      if ("undefined" === typeof Float64Array) {
        return $u$$ = +(+$u$$).toPrecision(16), $u$$ == $u$$ ? $u$$ : 0;
      }
      var $buffer$$16_byteArray$$ = new ArrayBuffer(8), $buffer$$16_byteArray$$ = new Float64Array($buffer$$16_byteArray$$);
      $buffer$$16_byteArray$$[0] = $u$$;
      return $buffer$$16_byteArray$$[0];
    }, makeEnum:function $$js_alg$$$makeEnum$($keys$$, $enm$$) {
      $enm$$ = $enm$$ || {};
      var $v$$ = 1;
      $js$$.alg.arrEach($keys$$, function($key$$, $val$$) {
        $enm$$[$key$$] = $v$$;
        $v$$ *= 2;
      });
      return $enm$$;
    }, rad2deg:function $$js_alg$$$rad2deg$($n$$, $d$$) {
      return 180 * $js$$.alg.number($n$$, $d$$) / Math.PI;
    }, deg2rad:function $$js_alg$$$deg2rad$($n$$, $d$$) {
      return $js$$.alg.number($n$$, $d$$) * Math.PI / 180;
    }, sliceArray:function $$js_alg$$$sliceArray$($a$$, $n$$) {
      var $ret$$ = $a$$;
      try {
        $ret$$ = Array.prototype.slice.call($a$$ || [], $n$$ || 0);
      } catch ($e$$) {
        $ret$$ = [];
      }
      return $ret$$;
    }, sortArrayObj:function $$js_alg$$$sortArrayObj$($arr$$, $asc$$, $field$$) {
      var $list$$ = $js$$.alg.sliceArray(arguments, 2);
      $arr$$.sort($js$$.alg.__sortArrayObj($asc$$, $list$$));
      return $arr$$;
    }, __sortArrayObj:function $$js_alg$$$__sortArrayObj$($asc$$, $list$$) {
      var $__ret$$;
      switch($js$$.env.browser.name) {
        case "IE":
        ;
        case "Edge":
          $__ret$$ = function $$__ret$$$($left$$, $right$$) {
            for (var $a$$2_i$$ = 0;$left$$ && $right$$ && $a$$2_i$$ < $list$$.length;$a$$2_i$$++) {
              $left$$ = $left$$[$list$$[$a$$2_i$$]], $right$$ = $right$$[$list$$[$a$$2_i$$]];
            }
            var $a$$2_i$$ = $asc$$ ? $left$$ : $right$$, $b$$ = $asc$$ ? $right$$ : $left$$;
            return $a$$2_i$$ > $b$$ ? 1 : $a$$2_i$$ < $b$$ ? -1 : 0;
          };
          break;
        default:
          $__ret$$ = function $$__ret$$$($left$$, $right$$) {
            for (var $i$$ = 0;$left$$ && $right$$ && $i$$ < $list$$.length;$i$$++) {
              $left$$ = $left$$[$list$$[$i$$]], $right$$ = $right$$[$list$$[$i$$]];
            }
            return $asc$$ ? $left$$ >= $right$$ : $left$$ <= $right$$;
          };
      }
      return $__ret$$;
    }, sortArrayNum:function $$js_alg$$$sortArrayNum$($arr$$, $asc$$) {
      $arr$$.sort(function($left$$, $right$$) {
        return $asc$$ ? $js$$.alg.number($left$$) - $js$$.alg.number($right$$) : $js$$.alg.number($right$$) - $js$$.alg.number($left$$);
      });
      return $arr$$;
    }, joinArray:function $$js_alg$$$joinArray$($arrRef$$, $arrFrom$$) {
      var $i$$, $chunk$$, $j$$;
      for ($i$$ = 1;$i$$ < arguments.length;$i$$++) {
        for ($arrFrom$$ = $js$$.alg.sliceArray(arguments[$i$$]), $j$$ = 0;$j$$ < $arrFrom$$.length;$j$$ += 8192) {
          $chunk$$ = $arrFrom$$.slice($j$$, $j$$ + 8192), Array.prototype.push.apply($arrRef$$, $chunk$$);
        }
      }
      return $arrRef$$;
    }, bindFn:function $$js_alg$$$bindFn$($thisArg$$, $fn$$, $args$$) {
      $args$$ = $args$$ && $args$$.length ? $js$$.alg.sliceArray($args$$) : $args$$ ? [$args$$] : [];
      return function() {
        var $ret$$ = null;
        "function" === typeof $fn$$ && ($ret$$ = $fn$$.apply($thisArg$$, $args$$.concat($js$$.alg.sliceArray(arguments))));
        return $ret$$;
      };
    }, mergeObj:function $$js_alg$$$mergeObj$($base$$) {
      function $__eachProperty$$($val$$, $prop$$, $from$$, $into$$) {
        $from$$.hasOwnProperty($prop$$) && ($into$$[$prop$$] = $val$$);
      }
      var $into$$ = $base$$, $args$$ = $js$$.alg.sliceArray(arguments, 1);
      $js$$.alg.each($args$$, function __eachObject($from$$, $_1$$, $_2$$, $into$$) {
        $from$$ && $into$$ && $js$$.alg.each($from$$, $__eachProperty$$, $into$$);
      }, $into$$);
      return $base$$;
    }, cloneObj:function $$js_alg$$$cloneObj$($obj$$) {
      return $obj$$ && "object" === typeof $obj$$ ? $js$$.alg.mergeObj($obj$$.constructor(), $obj$$) : $obj$$;
    }, deepCloneObj:function $$js_alg$$$deepCloneObj$($obj$$0$$) {
      if (!$obj$$0$$ || "object" !== typeof $obj$$0$$) {
        return $obj$$0$$;
      }
      $obj$$0$$ = this.cloneObj($obj$$0$$);
      $js$$.alg.each($obj$$0$$, function($value$$, $key$$, $obj$$) {
        $obj$$[$key$$] = $js$$.alg.deepCloneObj($value$$);
      });
      return $obj$$0$$;
    }, keycodes:{KC_Backspace:8, KC_Tab:9, KC_Enter:13, KC_Shift:16, KC_Ctrl:17, KC_Alt:18, KC_Pause:19, KC_Break:19, KC_CapsLock:20, KC_Escape:27, KC_Space:32, KC_PageUp:33, KC_PageDown:34, KC_End:35, KC_Home:36, KC_LeftArrow:37, KC_UpArrow:38, KC_RightArrow:39, KC_DownArrow:40, KC_Insert:45, KC_Delete:46, KC_0:48, KC_1:49, KC_2:50, KC_3:51, KC_4:52, KC_5:53, KC_6:54, KC_7:55, KC_8:56, KC_9:57, KC_A:65, KC_B:66, KC_C:67, KC_D:68, KC_E:69, KC_F:70, KC_G:71, KC_H:72, KC_I:73, KC_J:74, KC_K:75, KC_L:76, 
    KC_M:77, KC_N:78, KC_O:79, KC_P:80, KC_Q:81, KC_R:82, KC_S:83, KC_T:84, KC_U:85, KC_V:86, KC_W:87, KC_X:88, KC_Y:89, KC_Z:90, KC_LWin:91, KC_RWin:92, KC_Select:93, KC_Num0:96, KC_Num1:97, KC_Num2:98, KC_Num3:99, KC_Num4:100, KC_Num5:101, KC_Num6:102, KC_Num7:103, KC_Num8:104, KC_Num9:105, KC_NumAsterisk:106, KC_NumPlus:107, KC_NumMinus:109, KC_NumPeriod:110, KC_NumSlash:111, KC_F1:112, KC_F2:113, KC_F3:114, KC_F4:115, KC_F5:116, KC_F6:117, KC_F7:118, KC_F8:119, KC_F9:120, KC_F10:121, KC_F11:122, 
    KC_F12:123, KC_NumLock:144, KC_ScrollLock:145, KC_SemiColon:186, KC_Equal:187, KC_Comma:188, KC_Dash:189, KC_Period:190, KC_FSlash:191, KC_BSlash:220, KC_Grave:192, KC_LBracket:219, KC_RBracket:221, KC_Apos:222}, min:function $$js_alg$$$min$($a$$, $b$$) {
      var $min$$ = $a$$;
      $js$$.alg.each(arguments, function($arg$$) {
        $min$$ = "undefined" === typeof $min$$ ? $arg$$ : $min$$;
        $min$$ = $min$$ > $arg$$ ? $arg$$ : $min$$;
      });
      return $min$$;
    }, max:function $$js_alg$$$max$($a$$, $b$$) {
      var $max$$ = $a$$;
      $js$$.alg.each(arguments, function($arg$$) {
        $max$$ = "undefined" === typeof $max$$ ? $arg$$ : $max$$;
        $max$$ = $max$$ < $arg$$ ? $arg$$ : $max$$;
      });
      return $max$$;
    }};
    $js$$ && Object.defineProperty($js$$, "alg", {value:$js_alg$$});
    return $js_alg$$;
  }
  function $_bootstrapDom$$($js$$) {
    function $js_dom$$($el_element$$, $fn$$, $args$$) {
      var $s$$ = $el_element$$ = $el_element$$ || [];
      if (!$js_dom$$.fn.isPrototypeOf($el_element$$)) {
        if ("string" === typeof $s$$) {
          try {
            $el_element$$ = $document$$.querySelectorAll($s$$);
          } catch ($e$$) {
            $el_element$$ = $_parseHtml$$($s$$);
          }
        }
        $__isElement$$($el_element$$) && ($el_element$$ = [$el_element$$]);
        $el_element$$ = Array.prototype.slice.call($el_element$$, 0);
        $el_element$$ = Object.create($js_dom$$.fn, {_element:{value:$el_element$$}});
        $el_element$$.each(function($v$$) {
          $v$$.__jspyder || ($v$$.__jspyder = $_createRegistry$$());
        });
      }
      $el_element$$.use($fn$$, $args$$);
      return $el_element$$;
    }
    function $__isElement$$($o$$) {
      return $js$$.alg.bool("object" === typeof HTMLElement && $o$$ instanceof HTMLElement || $o$$ && "object" === typeof $o$$ && 1 === $o$$.nodeType && "string" === typeof $o$$.nodeName);
    }
    function $__getDomClasses$$($element$$) {
      return $__isElement$$($element$$) ? $element$$.className.replace(/(^\s+)|(\s(?=\s))|(\s+$)/g, "").split(" ") : [];
    }
    function $_parseHtml$$($i$$19_s$$) {
      var $div$$ = $document$$.createElement("div"), $arr$$ = [];
      $div$$.innerHTML = $i$$19_s$$;
      for ($i$$19_s$$ = 0;$i$$19_s$$ < $div$$.children.length;$i$$19_s$$++) {
        $arr$$.push($div$$.children[$i$$19_s$$]);
      }
      return $arr$$;
    }
    if ($js$$.dom) {
      return $js$$.dom;
    }
    $js_dom$$.fn = {_element:[], get count() {
      return this._element.length;
    }, each:function $$js_dom$$$fn$each$($fn$$, $data$$) {
      $js$$.alg.arrEach(this._element, $fn$$, $data$$);
      return this;
    }, use:function $$js_dom$$$fn$use$($fn$$, $args$$) {
      $js$$.alg.use(this, $fn$$, $args$$);
      return this;
    }, setCss:function $$js_dom$$$fn$setCss$($css$$, $fn$$) {
      if ($css$$ && "object" === typeof $css$$) {
        var $_each$$ = $js$$.alg.each;
        this.each(function($el$$0$$, $_1$$0$$, $_2$$, $css$$) {
          $_each$$($css$$, function($val$$, $attr$$, $_1$$, $el$$) {
            $el$$.style[$attr$$] = $val$$;
          }, $el$$0$$);
          "function" === typeof $fn$$ && $js_dom$$($el$$0$$, $fn$$, [$css$$]);
        }, $css$$);
      }
      return this;
    }, getCss:function $$js_dom$$$fn$getCss$($css$$1$$, $fn$$) {
      if ($css$$1$$ && "object" === typeof $css$$1$$) {
        var $o$$ = Object.create($css$$1$$), $_each$$ = $js$$.alg.each;
        this.each(function($el$$, $i$$, $_2$$, $css$$0$$) {
          $_2$$ = getComputedStyle($el$$);
          var $eStyle$$ = $el$$.style;
          $css$$0$$ = +$i$$ ? $css$$0$$.others : $css$$0$$.first;
          $_each$$($css$$0$$, function($_$$, $attr$$, $css$$, $data$$) {
            $css$$[$attr$$] = $data$$.style[$attr$$] || $data$$.cStyle[$attr$$];
          }, {style:$eStyle$$, cStyle:$_2$$});
          "function" === typeof $fn$$ && $js_dom$$($el$$, $fn$$, [$css$$0$$]);
        }, {first:$css$$1$$, others:$o$$});
      }
      return this;
    }, getPosition:function $$js_dom$$$fn$getPosition$($fn$$) {
      this.each(function($el$$) {
        var $pos$$ = $el$$.getBoundingClientRect();
        $js_dom$$($el$$).use($fn$$, [$pos$$]);
      });
      return this;
    }, exportPosition:function $$js_dom$$$fn$exportPosition$() {
      var $pos$$ = null;
      this.at(0).use(function() {
        $pos$$ = this._element[0].getBoundingClientRect();
      });
      return $pos$$;
    }, getOffsetPosition:function $$js_dom$$$fn$getOffsetPosition$($fn$$) {
      this.each(function() {
        for (var $el$$ = this.parentNode, $ret$$0$$ = {top:0, left:0, bottom:0, right:0, x:0, y:0, height:0, width:0};$el$$ && "static" === getComputedStyle($el$$).position;) {
          $el$$ = $el$$.parentNode;
        }
        if ($el$$) {
          var $me$$ = this.getBoundingClientRect(), $pr$$ = $el$$.getBoundingClientRect();
          $js$$.each($ret$$0$$, function($v$$, $p$$, $ret$$) {
            $ret$$[$p$$] = $pr$$[$p$$] - $me$$[$p$$];
          });
        }
        $js_dom$$(this).use($fn$$, [$ret$$0$$]);
      });
      return this;
    }, getAttrs:function $$js_dom$$$fn$getAttrs$($attrs$$, $fn$$) {
      if ($attrs$$ && "object" === typeof $attrs$$) {
        var $o$$ = Object.create($attrs$$), $_each$$ = $js$$.alg.each;
        this.each(function($el$$, $i$$, $_2$$, $attrs$$0$$) {
          $attrs$$0$$ = $i$$ ? $attrs$$0$$.others : $attrs$$0$$.first;
          $_each$$($attrs$$0$$, function($_$$, $a$$, $attrs$$) {
            $attrs$$[$a$$] = $el$$.getAttribute($a$$);
          });
          "function" === typeof $fn$$ && $js_dom$$($el$$, $fn$$, [$attrs$$0$$]);
        }, {first:$attrs$$, others:$o$$});
      }
      return this;
    }, setAttrs:function $$js_dom$$$fn$setAttrs$($attrs$$1$$, $fn$$) {
      if ($attrs$$1$$ && "object" === typeof $attrs$$1$$) {
        var $o$$ = Object.create($attrs$$1$$), $_each$$ = $js$$.alg.each;
        this.each(function($el$$0$$, $i$$, $_2$$, $attrs$$0$$) {
          $attrs$$0$$ = +$i$$ ? $attrs$$0$$.others : $attrs$$0$$.first;
          $_each$$($attrs$$0$$, function($v$$, $a$$, $attrs$$, $el$$) {
            null === $v$$ || "undefined" === typeof $v$$ ? $el$$.removeAttribute($a$$) : $el$$.setAttribute($a$$, $v$$);
          }, $el$$0$$);
          "function" === typeof $fn$$ && $js_dom$$($el$$0$$, $fn$$, [$attrs$$0$$]);
        }, {first:$attrs$$1$$, others:$o$$});
      }
      return this;
    }, parents:function $$js_dom$$$fn$parents$($fn$$) {
      this.each(function($element$$, $i$$, $elements$$) {
        $js_dom$$($element$$.parentNode, $fn$$, [$element$$]);
      });
      return this;
    }, children:function $$js_dom$$$fn$children$($fn$$, $data$$) {
      this.each(function($child_element$$, $i$$, $elements$$) {
        for ($child_element$$ = $child_element$$.firstElementChild;$child_element$$;) {
          $js_dom$$($child_element$$, $fn$$, [$child_element$$, $data$$]), $child_element$$ = $child_element$$.nextElementSibling;
        }
      });
      return this;
    }, at:function $$js_dom$$$fn$at$($n$$, $fn$$) {
      $n$$ = $js$$.alg.uint($n$$);
      return $js_dom$$(this._element[$n$$] || null, $fn$$);
    }, element:function $$js_dom$$$fn$element$($n$$, $fn$$) {
      this.at($n$$, function() {
        var $el$$ = this._element[0];
        $el$$ && "function" === typeof $fn$$ && $fn$$.apply($el$$, [this]);
      });
      return this;
    }, attach:function $$js_dom$$$fn$attach$($parent$$, $fn$$) {
      var $children$$ = this;
      $js_dom$$($parent$$).element(0, function($p$$) {
        var $doc$$ = $document$$.createDocumentFragment();
        $children$$.each($js_dom$$.fn._append, $doc$$);
        this.appendChild($doc$$);
        $p$$.use($fn$$, $children$$);
      });
      return this;
    }, attachBefore:function $$js_dom$$$fn$attachBefore$($parent$$, $fn$$) {
      var $children$$ = this;
      $js_dom$$($parent$$).element(0, function($p$$) {
        var $doc$$ = $document$$.createDocumentFragment();
        $children$$.each($js_dom$$.fn._append, $doc$$);
        this.parentNode && this.parentNode.insertBefore($doc$$, $p$$);
        $p$$.use($fn$$, $children$$);
      });
      return this;
    }, attachAfter:function $$js_dom$$$fn$attachAfter$($parent$$, $fn$$) {
      var $children$$ = this;
      $js_dom$$($parent$$).element(0, function($p$$) {
        var $doc$$ = $document$$.createDocumentFragment();
        $children$$.each($js_dom$$.fn._append, $doc$$);
        this.parentNode && this.parentNode.insertBefore($doc$$, this.nextSibling);
        $p$$.use($fn$$, $children$$);
      });
      return this;
    }, append:function $$js_dom$$$fn$append$($child$$) {
      this.element(0, function() {
        var $doc$$ = $document$$.createDocumentFragment();
        $js_dom$$($child$$).each($js_dom$$.fn._append, $doc$$);
        this.appendChild($doc$$);
      });
      return this;
    }, _append:function $$js_dom$$$fn$_append$($c$$, $_1$$, $_2$$, $doc$$) {
      $doc$$.appendChild($c$$);
    }, insertBefore:function $$js_dom$$$fn$insertBefore$($child$$) {
      this.element(0, function() {
        var $doc$$ = $document$$.createDocumentFragment();
        $js_dom$$($child$$).each($js_dom$$.fn._append, $doc$$);
        this.parentNode && this.parentNode.insertBefore($doc$$, this);
      });
      return this;
    }, insertAfter:function $$js_dom$$$fn$insertAfter$($child$$) {
      this.element(0, function() {
        var $doc$$ = $document$$.createDocumentFragment();
        $js_dom$$($child$$).each($js_dom$$.fn._append, $doc$$);
        this.parentNode && this.parentNode.insertBefore($doc$$, this.nextSibling);
      });
      return this;
    }, prepend:function $$js_dom$$$fn$prepend$($child$$) {
      this.element(0, function() {
        var $doc$$0$$ = $document$$.createDocumentFragment();
        $js_dom$$($child$$).each(function($c$$, $_1$$, $_2$$, $doc$$) {
          $doc$$.appendChild($c$$);
        }, $doc$$0$$);
        this.insertBefore($doc$$0$$, this.firstChild);
      });
      return this;
    }, remove:function $$js_dom$$$fn$remove$() {
      this.each(function($child$$) {
        $child$$.parentNode && $child$$.parentNode.removeChild($child$$);
      });
      return this;
    }, setClasses:function $$js_dom$$$fn$setClasses$($classes$$) {
      this.each(function($element$$0$$, $_1$$, $_2$$, $classes$$) {
        $js$$.alg.each($classes$$, function($classState_enable$$, $className$$, $_1$$6_clss$$, $element$$) {
          "toggle" === $classState_enable$$ && ($classState_enable$$ = -1 === $__getDomClasses$$($element$$).indexOf($className$$));
          $_1$$6_clss$$ = $__getDomClasses$$($element$$);
          var $index$$ = $_1$$6_clss$$.indexOf($className$$), $change$$ = !1;
          $classState_enable$$ && -1 === $index$$ ? ($_1$$6_clss$$.push($className$$), $change$$ = !0) : $classState_enable$$ || -1 === $index$$ || ($_1$$6_clss$$.splice($index$$, 1), $change$$ = !0);
          $change$$ && ($element$$.className = $_1$$6_clss$$.join(" "));
        }, $element$$0$$);
      }, $classes$$);
      return this;
    }, getClasses:function $$js_dom$$$fn$getClasses$($classes$$0$$, $fn$$) {
      this.each(function($element$$, $i$$, $_2$$0$$, $classes$$) {
        $classes$$ = $js$$.alg.number($i$$) ? $classes$$.second : $classes$$.first;
        $js$$.alg.each($classes$$, function($JSCompiler_temp_const$$1__1$$, $className$$, $_2$$, $JSCompiler_inline_result$$2_o$$) {
          $JSCompiler_temp_const$$1__1$$ = $JSCompiler_inline_result$$2_o$$.classes;
          $JSCompiler_inline_result$$2_o$$ = -1 !== $__getDomClasses$$($JSCompiler_inline_result$$2_o$$.el).indexOf($className$$);
          $JSCompiler_temp_const$$1__1$$[$className$$] = $JSCompiler_inline_result$$2_o$$;
        }, {el:$element$$, classes:$classes$$});
        $js_dom$$($element$$, $fn$$, [$classes$$]);
      }, {first:$classes$$0$$, second:Object.create($classes$$0$$)});
      return this;
    }, on:function $$js_dom$$$fn$on$($events$$, $handler$$) {
      $events$$ = ($events$$ || "").split(/\s+/);
      $js$$.alg.each($events$$, function($event$$, $_1$$, $_2$$, $self$$) {
        $js$$.alg.each($self$$._element, function($element$$) {
          $element$$.addEventListener($event$$, $handler$$);
          $element$$.__jspyder.fetch("js-events-" + $event$$) ? $element$$.__jspyder.fetch("js-events-" + $event$$).push($handler$$) : $element$$.__jspyder.stash("js-events-" + $event$$, [$handler$$]);
        });
      }, this);
      return this;
    }, off:function $$js_dom$$$fn$off$($events$$, $handler$$) {
      $events$$ = ($events$$ || "").split(/\s+/);
      var $self$$ = this;
      $js$$.alg.each($events$$, function($event$$) {
        $js$$.alg.each($self$$._element, function($element$$) {
          var $elist$$ = $element$$.__jspyder.fetch("js-events-" + $event$$), $index$$ = -1;
          $element$$.removeEventListener($event$$, $handler$$);
          if ($elist$$) {
            for (;0 <= ($index$$ = $elist$$.indexOf($handler$$));) {
              $elist$$[$index$$] = null;
            }
            $elist$$.sort().splice(0, $elist$$.indexOf(null));
          }
        });
      });
    }, trigger:function $$js_dom$$$fn$trigger$($event$$) {
      $event$$ = ($event$$ || "").toString().split(/\s+/);
      for (var $e$$, $i$$ = 0;$i$$ < $event$$.length;$i$$++) {
        if ($event$$[$i$$]) {
          try {
            $e$$ = new Event($event$$[$i$$], {bubbles:!0, cancelable:!1});
          } catch ($_$$) {
            $e$$ = $document$$.createEvent("Event"), $e$$.initEvent($event$$[$i$$], !0, !0);
          }
          this.each(function($el$$) {
            $el$$.dispatchEvent($e$$);
          });
        }
      }
      return this;
    }, setHtml:function $$js_dom$$$fn$setHtml$($html$$) {
      this.each(function($element$$) {
        $element$$.innerHTML = $html$$ || "";
      });
      return this;
    }, getHtml:function $$js_dom$$$fn$getHtml$($fn$$) {
      "function" === typeof $fn$$ && this.each(function($element$$) {
        $fn$$.call($element$$, $element$$.innerHTML || "");
      });
      return this;
    }, getText:function $$js_dom$$$fn$getText$($fn$$) {
      "function" === typeof $fn$$ && this.each(function($element$$) {
        $fn$$.call($element$$, $element$$.textContent || "");
      });
      return this;
    }, setText:function $$js_dom$$$fn$setText$($text$$) {
      this.each(function($element$$) {
        $element$$.textContent = $text$$ || "";
      });
      return this;
    }, find:function $$js_dom$$$fn$find$($cssSelector$$) {
      var $$found$$ = $js_dom$$(), $_found$$ = $$found$$._element;
      this.each(function($children$$3_element$$) {
        $cssSelector$$ && ($children$$3_element$$ = $children$$3_element$$.querySelectorAll($cssSelector$$), $js$$.alg.joinArray($_found$$, $js_dom$$($children$$3_element$$)._element));
      });
      return $$found$$;
    }, filter:function $$js_dom$$$fn$filter$($cssSelector$$) {
      var $$found$$ = $js_dom$$(), $_found$$ = $$found$$._element;
      this.each(function($element$$) {
        $js_dom$$.fn._matches($element$$, $cssSelector$$) && $_found$$.push($element$$);
      });
      return $$found$$;
    }, _matches:function $$js_dom$$$fn$_matches$($element$$0$$, $selector$$0$$) {
      var $fn$$ = "";
      $element$$0$$.matches ? $fn$$ = "matches" : $element$$0$$.matchesSelector ? $fn$$ = "matchesSelector" : $element$$0$$.msMatchesSelector ? $fn$$ = "msMatchesSelector" : $element$$0$$.mozMatchesSelector ? $fn$$ = "mozMatchesSelector" : $element$$0$$.webkitMatchesSelector ? $fn$$ = "webkitMatchesSelector" : $element$$0$$.oMatchesSelector ? $fn$$ = "oMatchesSelector" : $js_dom$$.fn._matches = function $$js_dom$$$fn$_matches$($element$$, $selector$$) {
        for (var $matches$$ = ($element$$.document || $element$$.ownerDocument).querySelectorAll($selector$$), $i$$ = $matches$$.length;0 <= --$i$$ && $matches$$.item($i$$) !== $element$$;) {
        }
        return -1 < $i$$;
      };
      $js_dom$$.fn._matches = function $$js_dom$$$fn$_matches$($element$$, $selector$$) {
        return $fn$$ && $element$$[$fn$$]($selector$$);
      };
      return this._matches($element$$0$$, $selector$$0$$);
    }, and:function $$js_dom$$$fn$and$($elements$$) {
      $js_dom$$($elements$$, this._and, [this._element]);
      return this;
    }, _and:function $$js_dom$$$fn$_and$($_elements$$) {
      $js$$.alg.joinArray($_elements$$, this._element);
    }, template:function $$js_dom$$$fn$template$($fields$$) {
      this.each(this._template, {self:this, fields:$fields$$});
      return this;
    }, _template:function $$js_dom$$$fn$_template$($element$$, $i$$, $elements$$, $o$$) {
      $o$$.self._template_parse($element$$, $o$$.fields);
    }, _template_parse:function $$js_dom$$$fn$_template_parse$($tDOM$$, $fields$$) {
      var $names$$ = Object.keys($fields$$), $n$$, $name$$, $field$$;
      for ($n$$ = 0;$n$$ < $names$$.length;$n$$++) {
        $name$$ = $names$$[$n$$], $field$$ = $fields$$[$name$$], this._template_insert($tDOM$$, "${" + $name$$ + "}", $field$$);
      }
      return $tDOM$$;
    }, _template_insert:function $$js_dom$$$fn$_template_insert$($children$$4_tDOM$$, $text$$, $element$$) {
      $children$$4_tDOM$$ = $children$$4_tDOM$$.childNodes;
      var $child$$, $c$$;
      for ($c$$ = 0;$c$$ < $children$$4_tDOM$$.length;$c$$++) {
        $child$$ = $children$$4_tDOM$$[$c$$], 3 === $child$$.nodeType ? this._template_replace($child$$, $text$$, $element$$) : this._template_insert($child$$, $text$$, $element$$);
      }
      return !0;
    }, _template_replace:function $$js_dom$$$fn$_template_replace$($node$$, $text$$, $element$$0$$) {
      var $index$$ = $node$$.data.indexOf($text$$), $parent$$ = $node$$.parentNode, $next$$;
      if (-1 === $index$$) {
        return !1;
      }
      $next$$ = $node$$.splitText($index$$);
      $next$$.data = $next$$.data.substr($text$$.length);
      $js_dom$$($element$$0$$).each(function($element$$) {
        $parent$$.insertBefore($element$$, $next$$);
      });
      return !0;
    }, setValue:function $$js_dom$$$fn$setValue$($val$$, $fn$$) {
      return this.each(function($element$$) {
        "undefined" !== typeof $element$$.value && "LI" !== $element$$.tagName ? $element$$.value = $val$$ : $element$$.setAttribute("value", $val$$);
      }).use($fn$$);
    }, setOverride:function $$js_dom$$$fn$setOverride$($name$$, $fn$$) {
      this.each(function($element$$) {
        $element$$.__jspyder.override = $element$$.__jspyder.override || {};
        $element$$.__jspyder.override[$name$$] = $fn$$;
      });
      return this;
    }, getOverride:function $$js_dom$$$fn$getOverride$($name$$) {
      var $fn$$ = null;
      this.each(function($element$$) {
        $element$$.__jspyder.override && $element$$.__jspyder.override[$name$$] && ($fn$$ = $element$$.__jspyder.override[$name$$], this.stop());
      });
      return $fn$$;
    }, getValue:function $$js_dom$$$fn$getValue$($fn$$) {
      var $self$$ = this;
      return $self$$.each(function($element$$) {
        var $$me_value$$ = $js_dom$$($element$$), $override$$ = $$me_value$$.getOverride("getValue");
        $override$$ ? $$me_value$$.use($override$$, [$fn$$]) : ($$me_value$$ = "undefined" !== typeof $element$$.value ? $element$$.value : $element$$.getAttribute("value"), "LI" === $element$$.tagName && ($$me_value$$ = $element$$.getAttribute("value")), "undefined" !== $$me_value$$ && $self$$.use($fn$$, [$$me_value$$]));
      });
    }, exportValue:function $$js_dom$$$fn$exportValue$() {
      var $value$$ = null;
      this.getValue(function($v$$) {
        $value$$ = $v$$;
      });
      return $value$$;
    }, getProps:function $$js_dom$$$fn$getProps$($obj$$0$$, $fn$$) {
      this.each(function($element$$) {
        $js$$.alg.each($obj$$0$$, function($val$$, $name$$, $obj$$) {
          $obj$$[$name$$] = $element$$[$name$$];
        });
      });
      this.use($fn$$, [$obj$$0$$]);
      return this;
    }, setProps:function $$js_dom$$$fn$setProps$($obj$$) {
      this.each(function($element$$) {
        $js$$.alg.each($obj$$, function($val$$, $name$$) {
          $element$$[$name$$] = $val$$;
        });
      });
      return this;
    }};
    $js_dom$$.doc = $js_dom$$($document$$.documentElement);
    $js$$ && Object.defineProperty($js$$, "dom", {value:$js_dom$$});
    return $js_dom$$;
  }
  function $_bootstrapLib$$($js$$) {
    function $js_lib$$($_fn_name$$, $args$$, $fn$$) {
      $_fn_name$$ = $_js_lib_repo$$.fetch($_fn_name$$);
      var $ret$$ = null;
      $_fn_name$$ && "function" === typeof $_fn_name$$ && ($ret$$ = $_fn_name$$.apply($js$$, $args$$));
      "function" === typeof $fn$$ && $fn$$.call(this, $ret$$);
      return this;
    }
    var $_js_lib_repo$$ = $_createRegistry$$();
    $js_lib$$.register = function $$js_lib$$$register$($name$$, $fn$$) {
      "string" == typeof $name$$ && ("function" !== typeof $fn$$ && null !== $fn$$ || $_js_lib_repo$$.stash($name$$, $fn$$));
      return this;
    };
    $js_lib$$.registerSet = function $$js_lib$$$registerSet$($o$$) {
      $o$$ && "object" === typeof $o$$ && $js$$.alg.each($o$$, function($fn$$, $name$$) {
        $js_lib$$.register($name$$, $fn$$);
      });
      return this;
    };
    $js$$.extend("lib", $js_lib$$);
  }
  function $_createRegistry$$() {
    var $_registry$$ = {};
    return {fetch:function($key$$, $fn$$) {
      var $val$$ = {key:$key$$, value:$_registry$$[$key$$]};
      "function" === typeof $fn$$ && $fn$$($val$$);
      return $val$$.value;
    }, stash:function($key$$, $val$$) {
      return $_registry$$[$key$$] = $val$$;
    }};
  }
  var $jspyder$$0$$ = $global$$0$$.jspyder, $document$$ = $global$$0$$.document || window.document;
  $jspyder$$0$$ || ($jspyder$$0$$ = $_bootstrap$$($global$$0$$));
  $global$$0$$[$alias$$] || ($global$$0$$[$alias$$] = $jspyder$$0$$);
  return $jspyder$$0$$;
})(window, "js");
jspyder.extend.fn("ajax", function() {
  function $js_ajax$$($url$$, $data$$, $fn$$) {
    var $ajax$$ = Object.create($js_ajax$$.fn);
    $ajax$$.data = "object" === typeof $data$$ && $data$$ ? $data$$ : {};
    $ajax$$.url = "string" === typeof $url$$ ? $url$$ : $ajax$$.url;
    $ajax$$.fn = "function" === typeof $fn$$ ? $fn$$ : $ajax$$.fn;
    "function" === typeof $fn$$ && $fn$$.apply($ajax$$);
    return $ajax$$;
  }
  function $__js_ajax_try$$($method$$, $url$$, $data$$, $fn$$, $context$$) {
    if (!$url$$) {
      return this;
    }
    var $xhttp$$ = new XMLHttpRequest;
    $xhttp$$.onreadystatechange = function xhttp_onreadystatechange() {
      4 === this.readyState && "function" === typeof $fn$$ && $fn$$.apply($js$$, [this, $context$$]);
      return null;
    };
    $xhttp$$.open($method$$, $url$$, !0);
    $data$$ || ($data$$ = {});
    $data$$.contentType && $xhttp$$.setRequestHeader("Content-Type", $data$$.contentType);
    $data$$.cache || $xhttp$$.setRequestHeader("Cache-Control", "no-cache");
    $xhttp$$.send();
    return this;
  }
  var $js$$ = this;
  $js_ajax$$.fn = {data:{}, url:"", fn:function $$js_ajax$$$fn$fn$() {
  }, get:function $$js_ajax$$$fn$get$($fn$$, $context$$) {
    $fn$$ = "function" === typeof $fn$$ ? $fn$$ : this.fn;
    $__js_ajax_try$$("GET", this.url, this.data, $fn$$, $context$$);
    return this;
  }, head:function $$js_ajax$$$fn$head$($fn$$, $context$$) {
    $fn$$ = "function" === typeof $fn$$ ? $fn$$ : this.fn;
    $__js_ajax_try$$("HEAD", this.url, this.data, $fn$$, $context$$);
    return this;
  }, post:function $$js_ajax$$$fn$post$($fn$$, $context$$) {
    $fn$$ = "function" === typeof $fn$$ ? $fn$$ : this.fn;
    $__js_ajax_try$$("POST", this.url, this.data, $fn$$, $context$$);
    return this;
  }};
  return $js_ajax$$;
});
jspyder.extend.fn("canvas", function() {
  function $js_canvas$$($alt_settings$$) {
    $alt_settings$$ = $alt_settings$$ || {};
    var $c$$ = $js$$.dom("<canvas></canvas>"), $attrs$$ = {height:$js$$.alg.number($alt_settings$$.height, 150), width:$js$$.alg.number($alt_settings$$.width, 300)}, $css$$ = $alt_settings$$.css;
    $alt_settings$$ = $alt_settings$$.alt;
    $c$$.setAttrs($attrs$$);
    $c$$.setCss($css$$);
    $c$$.setHtml($alt_settings$$);
    return Object.create($js_canvas$$.fn, {canvas:{value:$c$$}, queue:{value:[]}, context:{value:$c$$._element[0] && $c$$._element[0].getContext && $c$$._element[0].getContext("2d")}});
  }
  function $__mergeSettings$$($settings$$) {
    $settings$$ = $settings$$ || {};
    $settings$$.fill = $js$$.alg.string($settings$$.fill, "#FFF");
    $settings$$.border = $js$$.alg.string($settings$$.border, "transparent");
    $settings$$.borderWidth = $js$$.alg.number($settings$$.borderWidth, 0);
    $settings$$.borderTopWidth = $js$$.alg.number($settings$$.borderTopWidth, $settings$$.borderWidth);
    $settings$$.borderRightWidth = $js$$.alg.number($settings$$.borderRightWidth, $settings$$.borderWidth);
    $settings$$.borderBottomWidth = $js$$.alg.number($settings$$.borderBottomWidth, $settings$$.borderWidth);
    $settings$$.borderLeftWidth = $js$$.alg.number($settings$$.borderLeftWidth, $settings$$.borderWidth);
    $settings$$.x = $js$$.alg.number($settings$$.x, 0);
    $settings$$.y = $js$$.alg.number($settings$$.y, 0);
    $settings$$.height = $js$$.alg.number($settings$$.height, 0);
    $settings$$.width = $js$$.alg.number($settings$$.width, 0);
    return $settings$$;
  }
  var $js$$ = this;
  $js_canvas$$.fn = {canvas:null, context:null, queue:null, attach:function $$js_canvas$$$fn$attach$() {
    this.canvas && this.canvas.attach(arguments);
    return this;
  }, remove:function $$js_canvas$$$fn$remove$() {
    this.canvas && this.canvas.remove();
    return this;
  }, getSize:function $$js_canvas$$$fn$getSize$($o$$, $fn$$) {
    $o$$ = $o$$ || {};
    var $element$$ = this.canvas && this.canvas._element && this.canvas._element[0], $rect$$;
    $element$$ && ($rect$$ = $element$$.getBoundingClientRect(), $o$$.width = $element$$.width, $o$$.height = $element$$.height, $o$$.x = $rect$$.x, $o$$.y = $rect$$.y, $js$$.alg.use(this, $fn$$, [$o$$]));
    return this;
  }, exportSize:function $$js_canvas$$$fn$exportSize$() {
    var $size$$ = {};
    this.getSize($size$$);
    return $size$$;
  }, clear:function $$js_canvas$$$fn$clear$() {
    var $self$$ = this;
    this.getSize({}, function($size$$) {
      $self$$.context.clearRect(0, 0, $size$$.width, $size$$.height);
    });
    return this;
  }, render:function $$js_canvas$$$fn$render$() {
    this.clear();
    if (this.context) {
      var $self$$ = this;
      $js$$.alg.each(this.queue, function($command$$) {
        $js$$.alg.use($self$$, $command$$);
      });
    }
    return this;
  }, draw:function $$js_canvas$$$fn$draw$($type$$, $settings$$) {
    var $cmd$$ = this.cmd[$type$$], $data$$;
    $cmd$$ && ($data$$ = function $$data$$$() {
      $js$$.alg.use(this, $cmd$$, [$settings$$]);
    }, "function" === typeof $data$$ && ($data$$.settings = $settings$$, $data$$.type = $type$$, this.queue && this.queue.push($data$$)));
    return this;
  }, cmd:{rectangle:function $$js_canvas$$$fn$cmd$rectangle$($settings$$) {
    $settings$$ = $__mergeSettings$$($settings$$);
    this.context.fillStyle = $settings$$.border;
    this.context.fillRect($settings$$.x, $settings$$.y, $settings$$.width, $settings$$.height);
    this.context.fillStyle = $settings$$.fill;
    this.context.fillRect($settings$$.x + $settings$$.borderLeftWidth, $settings$$.y + $settings$$.borderTopWidth, $settings$$.width - ($settings$$.borderRightWidth + $settings$$.borderLeftWidth), $settings$$.height - ($settings$$.borderBottomWidth + $settings$$.borderTopWidth));
  }, arc:function $$js_canvas$$$fn$cmd$arc$($settings$$) {
    $settings$$ = $__mergeSettings$$($settings$$);
    $settings$$.radius = $js$$.alg.number($settings$$.radius, 0);
    $settings$$.anticlockwise = $js$$.alg.bool($settings$$.anticlockwise, !1);
    var $angle$$ = $js$$.alg.deg2rad($settings$$.angle, 0), $degrees$$ = $js$$.alg.deg2rad($settings$$.degrees, 360) + $angle$$;
    this.context.beginPath();
    this.context.arc($settings$$.x, $settings$$.y, $settings$$.radius, $angle$$, $degrees$$, $settings$$.anticlockwise);
    $settings$$.fromcenter && this.context.lineTo($settings$$.x, $settings$$.y);
    $settings$$.closepath && this.context.closePath();
    this.context.strokeStyle = $settings$$.border;
    this.context.stroke();
    this.context.fillStyle = $settings$$.fill;
    this.context.fill();
  }, circle:function $$js_canvas$$$fn$cmd$circle$($settings$$) {
    $settings$$ = $__mergeSettings$$($settings$$);
    $settings$$.degrees = 360;
    this.cmd.arc.call(this, $settings$$);
  }, pie:function $$js_canvas$$$fn$cmd$pie$($settings$$) {
    $settings$$ = $__mergeSettings$$($settings$$);
    $settings$$.radius = $js$$.alg.number($settings$$.radius, 0);
    $settings$$.angle = $js$$.alg.number($settings$$.angle, -90);
    $settings$$.anticlockwise = $js$$.alg.bool($settings$$.anticlockwise, !1);
    $settings$$.closepath = !0;
    var $canvas$$ = this, $total$$ = 0, $angle$$ = 0;
    $settings$$.degrees = 360;
    $js$$.alg.use($canvas$$, $canvas$$.cmd.arc, [$settings$$]);
    $js$$.alg.each($settings$$.sections, function($section$$) {
      $total$$ += $js$$.alg.number($section$$.value, 0);
    });
    $js$$.alg.each($settings$$.sections, function($arc_section$$) {
      var $deg$$ = $js$$.alg.number($arc_section$$.value, 0) / $total$$ * 360;
      $arc_section$$ = $js$$.alg.mergeObj({}, $settings$$, {angle:$angle$$ + $settings$$.angle, degrees:$deg$$, fill:$arc_section$$.fill, fromcenter:!0, closepath:!0});
      $angle$$ += $deg$$;
      $js$$.alg.use($canvas$$, $canvas$$.cmd.arc, [$arc_section$$]);
    });
  }, text:function $$js_canvas$$$fn$cmd$text$($settings$$) {
    $settings$$ = $settings$$ || {};
    $settings$$.size = $js$$.alg.number($settings$$.size, 16);
    $settings$$.font = $js$$.alg.string($settings$$.font, "Arial");
    $settings$$.text = $js$$.alg.string($settings$$.text, "");
    $settings$$.x = $js$$.alg.string($settings$$.x, 0);
    $settings$$.y = $js$$.alg.string($settings$$.y, 0);
    $settings$$.outline = $js$$.alg.string($settings$$.outline, "transparent");
    $settings$$.fill = $js$$.alg.string($settings$$.fill, "black");
    $settings$$.textalign = $js$$.alg.string($settings$$.textalign, "start");
    this.context.textAlign = $settings$$.textalign;
    this.context.font = $settings$$.size + "px " + $settings$$.font;
    this.context.fillStyle = $settings$$.fill;
    this.context.fillText($settings$$.text, $settings$$.x, $settings$$.y);
    this.context.strokeStyle = $settings$$.outline;
    this.context.strokeText($settings$$.text, $settings$$.x, $settings$$.y);
  }, line:function $$js_canvas$$$fn$cmd$line$($settings$$) {
    $settings$$ = $settings$$ || {};
    $settings$$.x = $js$$.alg.number($settings$$.x, 0);
    $settings$$.y = $js$$.alg.number($settings$$.y, 0);
    $settings$$.width = $js$$.alg.number($settings$$.width, 0);
    $settings$$.height = $js$$.alg.number($settings$$.height, 0);
    $settings$$.color = $js$$.alg.string($settings$$.color, "black");
    $settings$$.thickness = $js$$.alg.number($settings$$.thickness, 1);
    this.context.strokeStyle = $settings$$.color;
    this.context.lineWidth = $settings$$.thickness;
    this.context.beginPath();
    this.context.moveTo($settings$$.x, $settings$$.y);
    this.context.lineTo($settings$$.x + $settings$$.width, $settings$$.y + $settings$$.height);
    this.context.stroke();
  }, barchart:function $$js_canvas$$$fn$cmd$barchart$($offsetY_settings$$) {
    $offsetY_settings$$ = $offsetY_settings$$ || {};
    var $sections$$ = $js$$.alg.sliceArray($offsetY_settings$$.sections) || [], $chartY_size$$ = this.exportSize(), $borderWidth$$ = $js$$.alg.number($offsetY_settings$$.borderWidth, 1), $width$$ = $js$$.alg.number($offsetY_settings$$.width, $chartY_size$$.width), $height$$ = $js$$.alg.number($offsetY_settings$$.height, $chartY_size$$.height), $chartX$$ = $js$$.alg.number($offsetY_settings$$.x, 0), $chartY_size$$ = $js$$.alg.number($offsetY_settings$$.y, 0), $fill$$ = $js$$.alg.string($offsetY_settings$$.fill, 
    "white"), $border$$ = $js$$.alg.string($offsetY_settings$$.border, "black"), $lineColor$$ = $js$$.alg.string($offsetY_settings$$.lineColor, "rgba(0, 0, 0, 0.3)"), $labels$$ = $offsetY_settings$$.labels || [], $labelSize$$ = $js$$.alg.number($offsetY_settings$$.labelSize, 16), $self$$ = this, $min$$ = $js$$.alg.number($offsetY_settings$$.min, Infinity), $max$$ = $js$$.alg.number($offsetY_settings$$.max, -Infinity), $cols$$, $colWidth$$;
    $offsetY_settings$$ = 1.2 * $labelSize$$;
    $self$$.cmd.rectangle.call(this, {width:$width$$, height:$height$$, x:$chartX$$, y:$chartY_size$$, fill:$fill$$, borderWidth:$borderWidth$$, border:$border$$});
    $width$$ -= 2 * $borderWidth$$;
    $height$$ -= 2 * $borderWidth$$;
    $chartX$$ += $borderWidth$$;
    $chartY_size$$ += $borderWidth$$;
    $height$$ -= $offsetY_settings$$;
    $js$$.alg.arrEach($sections$$, function($group$$) {
      var $c$$ = -1;
      $js$$.alg.arrEach($group$$.values, function($bar$$) {
        $c$$++;
        $min$$ = $js$$.alg.min($min$$, $bar$$);
        $max$$ = $js$$.alg.max($max$$, $bar$$);
      });
      $cols$$ = $js$$.alg.max(++$c$$, $cols$$);
    });
    $max$$ = 1.1 * $js$$.alg.magnitude($max$$);
    $js$$.alg.iterate(0, 5, function($i$$) {
      $self$$.cmd.line.call($self$$, {x:$chartX$$, y:$height$$ * (5 - $i$$) / 5, width:$width$$ + $chartX$$, height:0, color:$lineColor$$});
      $self$$.cmd.text.call($self$$, {x:$labelSize$$ / 3, y:$height$$ * (5 - $i$$) / 5 - $labelSize$$ / 3, size:$labelSize$$, font:"Arial", text:$i$$ / 5 * $max$$ | 0, textalign:"left"});
      $self$$.cmd.text.call($self$$, {x:$width$$ - $labelSize$$ / 3, y:$height$$ * (5 - $i$$) / 5 - $labelSize$$ / 3, size:$labelSize$$, font:"Arial", text:$i$$ / 5 * $max$$ | 0, textalign:"right"});
    });
    $width$$ -= 50;
    $chartX$$ += 50;
    $colWidth$$ = $width$$ / (($sections$$.length + 1) * $cols$$);
    var $JSCompiler_object_inline_x_42$$ = $chartX$$, $JSCompiler_object_inline_y_43$$ = $chartY_size$$, $JSCompiler_object_inline_height_44$$ = $height$$ - $chartY_size$$, $JSCompiler_object_inline_vertWidth_46$$ = ($width$$ - $chartX$$) / $cols$$;
    $js$$.alg.iterate(0, $cols$$ + 1, function($i$$) {
      $self$$.cmd.line.call($self$$, {x:$JSCompiler_object_inline_x_42$$ + $JSCompiler_object_inline_vertWidth_46$$ * $i$$, y:$JSCompiler_object_inline_y_43$$, width:0, height:$JSCompiler_object_inline_height_44$$, color:$lineColor$$});
      $self$$.cmd.text.call($self$$, {text:$labels$$[$i$$], font:"Arial", size:$labelSize$$, x:$JSCompiler_object_inline_x_42$$ + $JSCompiler_object_inline_vertWidth_46$$ * ($i$$ + $i$$ + 1) / 2, y:$JSCompiler_object_inline_height_44$$ + $labelSize$$, textalign:"center"});
    });
    $js$$.alg.arrEach($sections$$, function($group$$, $g$$) {
      var $barColor$$ = $js$$.alg.string($group$$.fill, "black"), $barOutline$$ = $js$$.alg.string($group$$.border, $barColor$$), $barOutlineWidth$$ = $js$$.alg.number($group$$.borderWidth, 1);
      $js$$.alg.arrEach($group$$ && $group$$.values, function($bar$$, $b$$) {
        var $value$$ = $height$$ * ($js$$.alg.number($bar$$) / ($max$$ || 1));
        $self$$.cmd.rectangle.call($self$$, {x:$JSCompiler_object_inline_x_42$$ + ($colWidth$$ / $sections$$.length + $g$$ * $colWidth$$ + $b$$ * $JSCompiler_object_inline_vertWidth_46$$), y:$JSCompiler_object_inline_y_43$$ + ($JSCompiler_object_inline_height_44$$ - $JSCompiler_object_inline_y_43$$ - $value$$), width:$colWidth$$, height:$value$$, fill:$barColor$$, border:$barOutline$$, borderWidth:$barOutlineWidth$$});
      });
    });
  }, linechart:function $$js_canvas$$$fn$cmd$linechart$($offsetY$$1_settings$$) {
    $offsetY$$1_settings$$ = $offsetY$$1_settings$$ || {};
    var $sections$$ = $js$$.alg.sliceArray($offsetY$$1_settings$$.sections) || [], $chartY$$1_size$$ = this.exportSize(), $borderWidth$$ = $js$$.alg.number($offsetY$$1_settings$$.borderWidth, 1), $width$$ = $js$$.alg.number($offsetY$$1_settings$$.width, $chartY$$1_size$$.width), $height$$ = $js$$.alg.number($offsetY$$1_settings$$.height, $chartY$$1_size$$.height), $chartX$$ = $js$$.alg.number($offsetY$$1_settings$$.x, 0), $chartY$$1_size$$ = $js$$.alg.number($offsetY$$1_settings$$.y, 0), $fill$$ = 
    $js$$.alg.string($offsetY$$1_settings$$.fill, "white"), $border$$ = $js$$.alg.string($offsetY$$1_settings$$.border, "black"), $labels$$ = $offsetY$$1_settings$$.labels || [], $labelSize$$ = $js$$.alg.number($offsetY$$1_settings$$.labelSize, 16), $lineColor$$0$$ = $js$$.alg.string($offsetY$$1_settings$$.linecolor, "rgba(0, 0, 0, 0.3)"), $self$$ = this, $min$$ = $js$$.alg.number($offsetY$$1_settings$$.min, Infinity), $max$$ = $js$$.alg.number($offsetY$$1_settings$$.max, -Infinity), $cols$$;
    $offsetY$$1_settings$$ = 1.2 * $labelSize$$;
    $self$$.cmd.rectangle.call(this, {width:$width$$, height:$height$$, x:$chartX$$, y:$chartY$$1_size$$, fill:$fill$$, borderWidth:$borderWidth$$, border:$border$$});
    $width$$ -= 2 * $borderWidth$$;
    $height$$ -= 2 * $borderWidth$$;
    $chartX$$ += $borderWidth$$;
    $chartY$$1_size$$ += $borderWidth$$;
    $height$$ -= $offsetY$$1_settings$$;
    $js$$.alg.arrEach($sections$$, function($group$$) {
      var $c$$ = -1;
      $js$$.alg.arrEach($group$$.values, function($value$$) {
        $c$$++;
        $min$$ = $js$$.alg.min($min$$, $value$$);
        $max$$ = $js$$.alg.max($max$$, $value$$);
      });
      $cols$$ = $js$$.alg.max(++$c$$, $cols$$);
    });
    $max$$ = 1.1 * $js$$.alg.magnitude($max$$);
    $js$$.alg.iterate(0, 5, function($i$$) {
      $self$$.cmd.line.call($self$$, {x:$chartX$$, y:$height$$ * (5 - $i$$) / 5, width:$width$$ + $chartX$$, height:0, color:$lineColor$$0$$});
      $self$$.cmd.text.call($self$$, {x:$labelSize$$ / 3, y:$height$$ * (5 - $i$$) / 5 - $labelSize$$ / 3, size:$labelSize$$, font:"Arial", text:$i$$ / 5 * $max$$ | 0, textalign:"left"});
      $self$$.cmd.text.call($self$$, {x:$width$$ - $labelSize$$ / 3, y:$height$$ * (5 - $i$$) / 5 - $labelSize$$ / 3, size:$labelSize$$, font:"Arial", text:$i$$ / 5 * $max$$ | 0, textalign:"right"});
    });
    var $width$$ = $width$$ - 50, $JSCompiler_object_inline_x_47$$ = $chartX$$ += 50, $JSCompiler_object_inline_y_48$$ = $chartY$$1_size$$, $JSCompiler_object_inline_height_49$$ = $height$$ - $chartY$$1_size$$, $JSCompiler_object_inline_vertWidth_51$$ = ($width$$ - $chartX$$) / ($cols$$ - 1);
    $js$$.alg.iterate(0, $cols$$, function($i$$) {
      var $x$$ = $JSCompiler_object_inline_x_47$$ + $JSCompiler_object_inline_vertWidth_51$$ * $i$$;
      $self$$.cmd.line.call($self$$, {x:$x$$, y:$JSCompiler_object_inline_y_48$$, width:0, height:$JSCompiler_object_inline_height_49$$, color:$lineColor$$0$$});
      $self$$.cmd.text.call($self$$, {text:$labels$$[$i$$], font:"Arial", size:$labelSize$$, x:$x$$, y:$JSCompiler_object_inline_height_49$$ + $labelSize$$, textalign:"center"});
    });
    $js$$.alg.arrEach($sections$$, function($group$$, $g$$) {
      var $lineColor$$ = $js$$.alg.string($group$$.fill, "transparent"), $lineOutline$$ = $js$$.alg.string($group$$.border, "black"), $lineOutlineWidth$$ = $js$$.alg.number($group$$.borderWidth, 1), $dotColor$$ = $js$$.alg.string($group$$.dotfill, $lineColor$$), $dotOutline$$ = $js$$.alg.string($group$$.dotBorder, $lineOutline$$), $dotOutlineWidth$$ = $js$$.alg.string($group$$.dotBorderWidth, $lineOutlineWidth$$);
      $js$$.alg.number($group$$.dotRadius, 4);
      $js$$.alg.arrEach($group$$ && $group$$.values, function($v2_val$$, $b$$, $v1_values$$) {
        $v1_values$$ = $JSCompiler_object_inline_height_49$$ - ($JSCompiler_object_inline_y_48$$ + $JSCompiler_object_inline_height_49$$ * $js$$.alg.number($v1_values$$[$b$$ - 1]) / ($max$$ || 1));
        $v2_val$$ = $JSCompiler_object_inline_height_49$$ - ($JSCompiler_object_inline_y_48$$ + $JSCompiler_object_inline_height_49$$ * $js$$.alg.number($v2_val$$) / ($max$$ || 1));
        var $x$$ = $JSCompiler_object_inline_x_47$$ + $JSCompiler_object_inline_vertWidth_51$$ * ($b$$ - 1), $dotX$$ = $JSCompiler_object_inline_x_47$$ + $JSCompiler_object_inline_vertWidth_51$$ * $b$$;
        $b$$ && $self$$.cmd.line.call($self$$, {x:$x$$, y:$v1_values$$, width:$JSCompiler_object_inline_vertWidth_51$$, height:$v2_val$$ - $v1_values$$, color:$lineOutline$$, thickness:$lineOutlineWidth$$});
        $self$$.cmd.circle.call($self$$, {y:$v2_val$$, x:$dotX$$, radius:4, fill:$dotColor$$, border:$dotOutline$$, thickness:$dotOutlineWidth$$});
        $self$$.cmd.circle.call($self$$, {y:$v1_values$$, x:$x$$, radius:4, fill:$dotColor$$, border:$dotOutline$$, thickness:$dotOutlineWidth$$});
      });
    });
  }}};
  return $js_canvas$$;
});
jspyder.extend.fn("date", function() {
  function $js_date$$($value$$, $format$$, $utc$$) {
    return Object.create($js_date$$.fn).setDate($value$$, $format$$, $utc$$);
  }
  function $__buildFormatRegexStringFrom$$($from$$, $style$$) {
    var $reArray$$ = [], $str$$ = null, $rex$$ = null, $val$$ = {}, $rev$$ = {};
    $js$$.alg.arrEach($from$$, function($collection$$, $i$$) {
      var $cs$$ = $collection$$[$style$$];
      $cs$$ && ($reArray$$.push($cs$$), $val$$[$cs$$] = $i$$, $rev$$[$i$$] = $cs$$);
    });
    $reArray$$.sort(function($a$$, $b$$) {
      return $b$$.length - $a$$.length;
    });
    $str$$ = "(" + $reArray$$.join("|") + ")";
    $rex$$ = new RegExp($str$$, "g");
    return {string:$str$$, regexp:$rex$$, values:$val$$, lookup:$rev$$};
  }
  function $__parseString$$($v$$, $f$$) {
    $v$$ = $js$$.alg.string($v$$, "");
    var $format$$ = $js$$.alg.string($f$$), $d$$ = {y:0, m:0, d:1, h:0, n:0, s:0, x:0, a:0};
    $js$$.alg.arrEach($format$$.match($__reSearch$$), function($match$$) {
      var $collection$$1_value$$ = $__formatCollection$$[$match$$];
      if (!$collection$$1_value$$) {
        return $match$$;
      }
      var $values$$ = $collection$$1_value$$.values, $collection$$1_value$$ = ($v$$.match($collection$$1_value$$.regexp) || [0])[0], $len$$ = $collection$$1_value$$.length, $start$$ = $v$$.indexOf($collection$$1_value$$);
      $v$$ = $v$$.substring($start$$ + $len$$);
      switch($match$$) {
        case "yy":
        ;
        case "YY":
          $collection$$1_value$$ = "20" + $collection$$1_value$$;
        case "yyyy":
        ;
        case "YYYY":
          $d$$.y = $js$$.alg.number($collection$$1_value$$);
          break;
        case "MMMM":
        ;
        case "MMM":
        ;
        case "mmmm":
        ;
        case "mmm":
          $collection$$1_value$$ = $values$$[$collection$$1_value$$] + 1;
        case "MM":
        ;
        case "mm":
        ;
        case "M":
        ;
        case "m":
          $d$$.m = $js$$.alg.number($collection$$1_value$$) - 1;
          break;
        case "ddth":
        ;
        case "dth":
          $collection$$1_value$$ = $collection$$1_value$$.substr(0, $collection$$1_value$$.length - 2);
        case "dd":
        ;
        case "d":
          $d$$.d = $js$$.alg.number($collection$$1_value$$) || 1;
          break;
        case "hh":
        ;
        case "h":
        ;
        case "HH":
        ;
        case "H":
          $d$$.h = $js$$.alg.number($collection$$1_value$$, 0);
          break;
        case "am":
        ;
        case "AM":
          $d$$.a = "pm" === $collection$$1_value$$ || "PM" === $collection$$1_value$$ ? 12 : 0;
          break;
        case "nn":
        ;
        case "n":
          $d$$.n = $js$$.alg.number($collection$$1_value$$, 0);
          break;
        case "ss":
        ;
        case "s":
          $d$$.s = $js$$.alg.number($collection$$1_value$$, 0);
          break;
        case "xxx":
          $d$$.x = $js$$.alg.number($collection$$1_value$$, 0);
          break;
        case "xx":
          $d$$.x = 10 * $js$$.alg.number($collection$$1_value$$, 0);
          break;
        case "x":
          $d$$.x = 100 * $js$$.alg.number($collection$$1_value$$, 0);
      }
    });
    return new Date($d$$.y, $d$$.m, $d$$.d, $d$$.h + $d$$.a, $d$$.n, $d$$.s, $d$$.x);
  }
  function $__formatDate$$($date$$, $format$$, $useUTC$$) {
    var $JSCompiler_object_inline_y_52$$ = $useUTC$$ ? $date$$.getUTCFullYear() : $date$$.getFullYear(), $JSCompiler_object_inline_m_53$$ = $useUTC$$ ? $date$$.getUTCMonth() : $date$$.getMonth(), $JSCompiler_object_inline_d_54$$ = $useUTC$$ ? $date$$.getUTCDate() : $date$$.getDate(), $JSCompiler_object_inline_h_55$$ = $useUTC$$ ? $date$$.getUTCHours() : $date$$.getHours(), $JSCompiler_object_inline_n_56$$ = $useUTC$$ ? $date$$.getUTCMinutes() : $date$$.getMinutes(), $JSCompiler_object_inline_s_57$$ = 
    $useUTC$$ ? $date$$.getUTCSeconds() : $date$$.getSeconds(), $JSCompiler_object_inline_w_58$$ = $useUTC$$ ? $date$$.getUTCDay() : $date$$.getDay(), $JSCompiler_object_inline_x_59$$ = $useUTC$$ ? $date$$.getUTCMilliseconds() : $date$$.getMilliseconds(), $left$$ = "", $right$$ = $format$$;
    $js$$.alg.arrEach($format$$.match($__reSearch$$), function($match$$) {
      var $collection$$ = $__formatCollection$$[$match$$] || /\[[^\\]*\]/g.test($match$$);
      if (!$collection$$) {
        return $match$$;
      }
      var $len$$ = $match$$.length, $start$$ = $right$$.indexOf($match$$), $value$$ = "";
      $left$$ += $right$$.substring(0, $start$$);
      $right$$ = $right$$.substring($start$$ + $len$$);
      switch($match$$) {
        case "YY":
        ;
        case "yy":
          $value$$ = $js$$.alg.string($JSCompiler_object_inline_y_52$$ % 100);
          break;
        case "YYYY":
        ;
        case "yyyy":
          $value$$ = $js$$.alg.string($JSCompiler_object_inline_y_52$$, "");
          break;
        case "MMMM":
        ;
        case "mmmm":
        ;
        case "MMM":
        ;
        case "mmm":
        ;
        case "MM":
        ;
        case "mm":
        ;
        case "M":
        ;
        case "m":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_m_53$$];
          break;
        case "dth":
        ;
        case "ddth":
        ;
        case "dd":
        ;
        case "d":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_d_54$$ - 1];
          break;
        case "DDDD":
        ;
        case "dddd":
        ;
        case "DDD":
        ;
        case "ddd":
        ;
        case "DD":
        ;
        case "D":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_w_58$$];
          break;
        case "am":
        ;
        case "AM":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_h_55$$];
          break;
        case "HH":
        ;
        case "H":
        ;
        case "hh":
        ;
        case "h":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_h_55$$];
          break;
        case "nn":
        ;
        case "n":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_n_56$$];
          break;
        case "ss":
        ;
        case "s":
          $value$$ = $collection$$.lookup[$JSCompiler_object_inline_s_57$$];
          break;
        case "xxx":
          $value$$ = ($js$$.alg.string($JSCompiler_object_inline_x_59$$) + "00").substr(0, 3);
          break;
        case "xx":
          $value$$ = ($js$$.alg.string($JSCompiler_object_inline_x_59$$) + "0").substr(0, 2);
          break;
        case "x":
          $value$$ = $js$$.alg.string($JSCompiler_object_inline_x_59$$).substr(0, 1);
          break;
        default:
          $value$$ = $match$$.substring(1, $match$$.length - 1);
      }
      $left$$ += $js$$.alg.string($value$$, "");
    });
    return $left$$ + $right$$;
  }
  var $js$$ = this;
  $js_date$$.fn = $js_date$$.prototype = {_value:null, _format:"", _useUTC:!1, clone:function $$js_date$$$$clone$() {
    return $js_date$$(new Date(this._value), this._format, this._useUTC);
  }, utcOffset:function $$js_date$$$$utcOffset$() {
    return this._value.getTimezoneOffset();
  }, isDst:function $$js_date$$$$isDst$() {
    var $offset$$ = this.utcOffset(), $clone$$ = this.clone();
    return $offset$$ > $clone$$.setMonth(1).utcOffset() || $offset$$ > $clone$$.setMonth(6).utcOffset();
  }, useUTC:function $$js_date$$$$useUTC$($utc$$) {
    this._useUTC = $js$$.alg.bool($utc$$, !0);
    return this;
  }, isUTC:function $$js_date$$$$isUTC$() {
    return this._useUTC;
  }, useLocal:function $$js_date$$$$useLocal$($local$$) {
    this._useUTC = !$js$$.alg.bool($local$$, !0);
    return this;
  }, setDate:function $$js_date$$$$setDate$($value$$, $format$$, $utc$$) {
    this._value = "undefined" === typeof $value$$ ? new Date : $js_date$$.fn.isPrototypeOf($value$$) ? $value$$._value : $value$$ instanceof Date || "[object Date]" === Object.prototype.toString.call($value$$) ? new Date($value$$) : "string" === typeof $value$$ ? $__parseString$$($value$$, $format$$) : "number" === typeof $value$$ ? new Date($value$$) : new Date(NaN);
    this._format = $js$$.alg.string($format$$, "");
    this._useUTC = $js$$.alg.bool($utc$$, !1);
    return this;
  }, asDate:function $$js_date$$$$asDate$() {
    return this._value;
  }, asString:function $$js_date$$$$asString$($format$$, $useUtc$$, $defaultText$$) {
    return this.isValid() ? ($format$$ = $js$$.alg.string($format$$, this._format || $__defaultFormat$$), $useUtc$$ = $js$$.alg.bool($useUtc$$, this._useUTC), $__formatDate$$(this._value, $format$$, $useUtc$$)) : $js$$.alg.string($defaultText$$, "");
  }, toString:function $$js_date$$$$toString$() {
    return Date.prototype.toString.apply(this._value, arguments);
  }, getTime:function $$js_date$$$$getTime$($year$$, $month$$, $date$$, $hour$$, $minute$$, $second$$, $ms$$) {
    var $v$$ = this._value;
    $year$$ = $js$$.alg.bool($year$$, !0) * $v$$.getFullYear();
    $month$$ = $js$$.alg.bool($month$$, !0) * $v$$.getMonth();
    $date$$ = $js$$.alg.bool($date$$, !0) * $v$$.getDate();
    $hour$$ = $js$$.alg.bool($hour$$, !0) * $v$$.getHours();
    $minute$$ = $js$$.alg.bool($minute$$, !0) * $v$$.getMinutes();
    $second$$ = $js$$.alg.bool($second$$, !0) * $v$$.getSeconds();
    $ms$$ = $js$$.alg.bool($ms$$, !0) * $v$$.getMilliseconds();
    return Date.prototype.getTime.call(new Date($year$$, $month$$, $date$$, $hour$$, $minute$$, $second$$, $ms$$));
  }, isValid:function $$js_date$$$$isValid$() {
    return this._value && !isNaN(this._value.getYear());
  }, addDays:function $$js_date$$$$addDays$($days$$) {
    this._value.setDate(this._value.getDate() + $js$$.alg.number($days$$));
    return this;
  }, setDay:function $$js_date$$$$setDay$($days$$) {
    this._value.setDate($js$$.alg.number($days$$));
    return this;
  }, getDay:function $$js_date$$$$getDay$() {
    return this._value.getDate();
  }, getDayList:function $$js_date$$$$getDayList$($format$$) {
    $format$$ = $js$$.alg.string($format$$, "d");
    for (var $count$$ = this.getDayCount(), $clone$$ = this.clone(), $d$$ = 1, $days$$ = [];$d$$ <= $count$$;) {
      $clone$$.setDay($d$$), $days$$.push($clone$$.asString($format$$)), $d$$++;
    }
    return $days$$;
  }, getDayCount:function $$js_date$$$$getDayCount$() {
    return $js$$.alg.number(this.clone().addMonths(1).setDay(0).asString("d"));
  }, getWeekdayList:function $$js_date$$$$getWeekdayList$($format$$) {
    $format$$ = $js$$.alg.string($format$$, "dddd");
    for (var $count$$ = this.getWeekdayCount(), $w$$ = 0, $weekday$$ = null, $weekdays$$ = [];$w$$ < $count$$;) {
      $weekday$$ = $__weekdays$$[$w$$], $weekdays$$.push("undefined" === typeof $weekday$$[$format$$] ? $format$$ : $weekday$$[$format$$]), $w$$++;
    }
    return $weekdays$$;
  }, getWeekdayCount:function $$js_date$$$$getWeekdayCount$() {
    return $js$$.alg.number($__weekdays$$.length, 0);
  }, getWeekdayOffset:function $$js_date$$$$getWeekdayOffset$() {
    var $data$$ = {str:this.clone().setDay(1).asString("dddd"), found:0};
    $js$$.alg.arrEach(this.getWeekdayList(), this._getWeekdayOffset, $data$$);
    return $js$$.alg.number($data$$.found, 0);
  }, _getWeekdayOffset:function $$js_date$$$$_getWeekdayOffset$($day$$, $daynum$$, $days$$, $data$$) {
    $day$$ === $data$$.str && ($data$$.found = $daynum$$, this.stop());
  }, addMonths:function $$js_date$$$$addMonths$($months$$) {
    this._value.setMonth(this._value.getMonth() + $js$$.alg.number($months$$));
    return this;
  }, setMonth:function $$js_date$$$$setMonth$($month$$) {
    this._value.setMonth($js$$.alg.number($month$$) - 1);
    return this;
  }, getMonth:function $$js_date$$$$getMonth$() {
    return this._value.getMonth() + 1;
  }, getMonthList:function $$js_date$$$$getMonthList$($data$$43_format$$) {
    $data$$43_format$$ = {a:[], f:$js$$.alg.string($data$$43_format$$, "mmmm"), c:this.clone()};
    $js$$.alg.arrEach($__months$$, this._getMonthList_each, $data$$43_format$$);
    return $data$$43_format$$.a;
  }, _getMonthList_each:function $$js_date$$$$_getMonthList_each$($monthDef$$, $i$$, $months$$, $ctx$$) {
    $ctx$$.c.setMonth($i$$ + 1);
    $ctx$$.a.push($ctx$$.c.asString($ctx$$.f));
  }, getMonthCount:function $$js_date$$$$getMonthCount$() {
    return $__months$$.length;
  }, addYears:function $$js_date$$$$addYears$($years$$) {
    this._value.setFullYear(this._value.getFullYear() + $js$$.alg.number($years$$));
    return this;
  }, setYear:function $$js_date$$$$setYear$($years$$) {
    this._value.setFullYear($js$$.alg.number($years$$));
    return this;
  }, getYear:function $$js_date$$$$getYear$() {
    return this._value.getFullYear();
  }, addSeconds:function $$js_date$$$$addSeconds$($seconds$$) {
    this._value.setSeconds(this._value.getSeconds() + $js$$.alg.number($seconds$$));
    return this;
  }, setSecond:function $$js_date$$$$setSecond$($seconds$$) {
    this._value.setSeconds($js$$.alg.number($seconds$$));
    return this;
  }, getSecond:function $$js_date$$$$getSecond$() {
    return this._value.getSeconds();
  }, addMinutes:function $$js_date$$$$addMinutes$($minutes$$) {
    this._value.setMinutes(this._value.getMinutes() + $js$$.alg.number($minutes$$));
    return this;
  }, setMinute:function $$js_date$$$$setMinute$($minutes$$) {
    this._value.setMinutes($js$$.alg.number($minutes$$));
    return this;
  }, getMinute:function $$js_date$$$$getMinute$() {
    return this._value.getMinutes();
  }, addHours:function $$js_date$$$$addHours$($hours$$) {
    this._value.setHours(this._value.getHours() + $js$$.alg.number($hours$$));
    return this;
  }, setHour:function $$js_date$$$$setHour$($hours$$) {
    this._value.setHours($js$$.alg.number($hours$$));
    return this;
  }, getHour:function $$js_date$$$$getHour$() {
    return this._value.getHours();
  }};
  var $__reSearch$$ = /(\[[^\]]*\]|YYYY|YY|yyyy|yy|MMMM|MMM|MM|M|mmmm|mmm|mm|m|dddd|ddd|ddth|dth|dd|d|DDDD|DDD|DD|D|AM|am|HH|H|hh|h|nn|n|ss|s|xxx|xx|x)/g, $__defaultFormat$$ = "ddd mmm d yyyy hh:mm:ss", $__years$$ = [{YY:"\\d{2}", YYYY:"\\d{4}", yy:"\\d{2}", yyyy:"\\d{4}"}], $__months$$ = [{m:"1", mm:"01", mmm:"Jan", mmmm:"January", M:"1", MM:"01", MMM:"JAN", MMMM:"JANUARY"}, {m:"2", mm:"02", mmm:"Feb", mmmm:"February", M:"2", MM:"02", MMM:"FEB", MMMM:"FEBRUARY"}, {m:"3", mm:"03", mmm:"Mar", mmmm:"March", 
  M:"3", MM:"03", MMM:"MAR", MMMM:"MARCH"}, {m:"4", mm:"04", mmm:"Apr", mmmm:"April", M:"4", MM:"04", MMM:"APR", MMMM:"APRIL"}, {m:"5", mm:"05", mmm:"May", mmmm:"May", M:"5", MM:"05", MMM:"MAY", MMMM:"MAY"}, {m:"6", mm:"06", mmm:"Jun", mmmm:"June", M:"6", MM:"06", MMM:"JUN", MMMM:"JUNE"}, {m:"7", mm:"07", mmm:"Jul", mmmm:"July", M:"7", MM:"07", MMM:"JUL", MMMM:"JULY"}, {m:"8", mm:"08", mmm:"Aug", mmmm:"August", M:"8", MM:"08", MMM:"AUG", MMMM:"AUGUST"}, {m:"9", mm:"09", mmm:"Sep", mmmm:"September", 
  M:"9", MM:"09", MMM:"SEP", MMMM:"SEPTEMBER"}, {m:"10", mm:"10", mmm:"Oct", mmmm:"October", M:"10", MM:"10", MMM:"OCT", MMMM:"OCTOBER"}, {m:"11", mm:"11", mmm:"Nov", mmmm:"November", M:"11", MM:"11", MMM:"NOV", MMMM:"NOVEMBER"}, {m:"12", mm:"12", mmm:"Dec", mmmm:"December", M:"12", MM:"12", MMM:"DEC", MMMM:"DECEMBER"}], $__days$$ = [{d:"1", dd:"01", dth:"1st", ddth:"01st"}, {d:"2", dd:"02", dth:"2nd", ddth:"02nd"}, {d:"3", dd:"03", dth:"3rd", ddth:"03th"}, {d:"4", dd:"04", dth:"4th", ddth:"04th"}, 
  {d:"5", dd:"05", dth:"5th", ddth:"05th"}, {d:"6", dd:"06", dth:"6th", ddth:"06th"}, {d:"7", dd:"07", dth:"7th", ddth:"07th"}, {d:"8", dd:"08", dth:"8th", ddth:"08th"}, {d:"9", dd:"09", dth:"9th", ddth:"09rd"}, {d:"10", dd:"10", dth:"10th", ddth:"10th"}, {d:"11", dd:"11", dth:"11th", ddth:"11st"}, {d:"12", dd:"12", dth:"12th", ddth:"12th"}, {d:"13", dd:"13", dth:"13th", ddth:"13th"}, {d:"14", dd:"14", dth:"14th", ddth:"14th"}, {d:"15", dd:"15", dth:"15th", ddth:"15th"}, {d:"16", dd:"16", dth:"16th", 
  ddth:"16th"}, {d:"17", dd:"17", dth:"17th", ddth:"17th"}, {d:"18", dd:"18", dth:"18th", ddth:"18th"}, {d:"19", dd:"19", dth:"19th", ddth:"19th"}, {d:"20", dd:"20", dth:"20th", ddth:"20th"}, {d:"21", dd:"21", dth:"21st", ddth:"21th"}, {d:"22", dd:"22", dth:"22nd", ddth:"22nd"}, {d:"23", dd:"23", dth:"23rd", ddth:"23th"}, {d:"24", dd:"24", dth:"24th", ddth:"24th"}, {d:"25", dd:"25", dth:"25th", ddth:"25th"}, {d:"26", dd:"26", dth:"26th", ddth:"26th"}, {d:"27", dd:"27", dth:"27th", ddth:"27th"}, {d:"28", 
  dd:"28", dth:"28th", ddth:"28th"}, {d:"29", dd:"29", dth:"29th", ddth:"29rd"}, {d:"30", dd:"30", dth:"30th", ddth:"30th"}, {d:"31", dd:"31", dth:"31st", ddth:"31st"}], $__weekdays$$ = [{D:"S", DD:"Su", DDD:"SUN", DDDD:"SUNDAY", ddd:"Sun", dddd:"Sunday"}, {D:"M", DD:"Mo", DDD:"MON", DDDD:"MONDAY", ddd:"Mon", dddd:"Monday"}, {D:"T", DD:"Tu", DDD:"TUE", DDDD:"TUESDAY", ddd:"Tue", dddd:"Tuesday"}, {D:"W", DD:"We", DDD:"WED", DDDD:"WEDNESDAY", ddd:"Wed", dddd:"Wednesday"}, {D:"T", DD:"Th", DDD:"THU", 
  DDDD:"THURSDAY", ddd:"Thu", dddd:"Thursday"}, {D:"F", DD:"Fr", DDD:"FRI", DDDD:"FRIDAY", ddd:"Fri", dddd:"Friday"}, {D:"S", DD:"Sa", DDD:"SAT", DDDD:"SATURDAY", ddd:"Sat", dddd:"Saturday"}], $__hours$$ = [{h:"12", hh:"12", H:"0", HH:"00", AM:"AM", am:"am"}, {h:"1", hh:"01", H:"1", HH:"01", AM:"AM", am:"am"}, {h:"2", hh:"02", H:"2", HH:"02", AM:"AM", am:"am"}, {h:"3", hh:"03", H:"3", HH:"03", AM:"AM", am:"am"}, {h:"4", hh:"04", H:"4", HH:"04", AM:"AM", am:"am"}, {h:"5", hh:"05", H:"5", HH:"05", 
  AM:"AM", am:"am"}, {h:"6", hh:"06", H:"6", HH:"06", AM:"AM", am:"am"}, {h:"7", hh:"07", H:"7", HH:"07", AM:"AM", am:"am"}, {h:"8", hh:"08", H:"8", HH:"08", AM:"AM", am:"am"}, {h:"9", hh:"09", H:"9", HH:"09", AM:"AM", am:"am"}, {h:"10", hh:"10", H:"10", HH:"10", AM:"AM", am:"am"}, {h:"11", hh:"11", H:"11", HH:"11", AM:"AM", am:"am"}, {h:"12", hh:"12", H:"12", HH:"12", AM:"PM", am:"pm"}, {h:"1", hh:"01", H:"13", HH:"13", AM:"PM", am:"pm"}, {h:"2", hh:"02", H:"14", HH:"14", AM:"PM", am:"pm"}, {h:"3", 
  hh:"03", H:"15", HH:"15", AM:"PM", am:"pm"}, {h:"4", hh:"04", H:"16", HH:"16", AM:"PM", am:"pm"}, {h:"5", hh:"05", H:"17", HH:"17", AM:"PM", am:"pm"}, {h:"6", hh:"06", H:"18", HH:"18", AM:"PM", am:"pm"}, {h:"7", hh:"07", H:"19", HH:"19", AM:"PM", am:"pm"}, {h:"8", hh:"08", H:"20", HH:"20", AM:"PM", am:"pm"}, {h:"9", hh:"09", H:"21", HH:"21", AM:"PM", am:"pm"}, {h:"10", hh:"10", H:"22", HH:"22", AM:"PM", am:"pm"}, {h:"11", hh:"11", H:"23", HH:"23", AM:"PM", am:"pm"}], $__minutes$$ = [{n:"0", nn:"00"}, 
  {n:"1", nn:"01"}, {n:"2", nn:"02"}, {n:"3", nn:"03"}, {n:"4", nn:"04"}, {n:"5", nn:"05"}, {n:"6", nn:"06"}, {n:"7", nn:"07"}, {n:"8", nn:"08"}, {n:"9", nn:"09"}, {n:"10", nn:"10"}, {n:"11", nn:"11"}, {n:"12", nn:"12"}, {n:"13", nn:"13"}, {n:"14", nn:"14"}, {n:"15", nn:"15"}, {n:"16", nn:"16"}, {n:"17", nn:"17"}, {n:"18", nn:"18"}, {n:"19", nn:"19"}, {n:"20", nn:"20"}, {n:"21", nn:"21"}, {n:"22", nn:"22"}, {n:"23", nn:"23"}, {n:"24", nn:"24"}, {n:"25", nn:"25"}, {n:"26", nn:"26"}, {n:"27", nn:"27"}, 
  {n:"28", nn:"28"}, {n:"29", nn:"29"}, {n:"30", nn:"30"}, {n:"31", nn:"31"}, {n:"32", nn:"32"}, {n:"33", nn:"33"}, {n:"34", nn:"34"}, {n:"35", nn:"35"}, {n:"36", nn:"36"}, {n:"37", nn:"37"}, {n:"38", nn:"38"}, {n:"39", nn:"39"}, {n:"40", nn:"40"}, {n:"41", nn:"41"}, {n:"42", nn:"42"}, {n:"43", nn:"43"}, {n:"44", nn:"44"}, {n:"45", nn:"45"}, {n:"46", nn:"46"}, {n:"47", nn:"47"}, {n:"48", nn:"48"}, {n:"49", nn:"49"}, {n:"50", nn:"50"}, {n:"51", nn:"51"}, {n:"52", nn:"52"}, {n:"53", nn:"53"}, {n:"54", 
  nn:"54"}, {n:"55", nn:"55"}, {n:"56", nn:"56"}, {n:"57", nn:"57"}, {n:"58", nn:"58"}, {n:"59", nn:"59"}], $__seconds$$ = [{s:"0", ss:"00"}, {s:"1", ss:"01"}, {s:"2", ss:"02"}, {s:"3", ss:"03"}, {s:"4", ss:"04"}, {s:"5", ss:"05"}, {s:"6", ss:"06"}, {s:"7", ss:"07"}, {s:"8", ss:"08"}, {s:"9", ss:"09"}, {s:"10", ss:"10"}, {s:"11", ss:"11"}, {s:"12", ss:"12"}, {s:"13", ss:"13"}, {s:"14", ss:"14"}, {s:"15", ss:"15"}, {s:"16", ss:"16"}, {s:"17", ss:"17"}, {s:"18", ss:"18"}, {s:"19", ss:"19"}, {s:"20", 
  ss:"20"}, {s:"21", ss:"21"}, {s:"22", ss:"22"}, {s:"23", ss:"23"}, {s:"24", ss:"24"}, {s:"25", ss:"25"}, {s:"26", ss:"26"}, {s:"27", ss:"27"}, {s:"28", ss:"28"}, {s:"29", ss:"29"}, {s:"30", ss:"30"}, {s:"31", ss:"31"}, {s:"32", ss:"32"}, {s:"33", ss:"33"}, {s:"34", ss:"34"}, {s:"35", ss:"35"}, {s:"36", ss:"36"}, {s:"37", ss:"37"}, {s:"38", ss:"38"}, {s:"39", ss:"39"}, {s:"40", ss:"40"}, {s:"41", ss:"41"}, {s:"42", ss:"42"}, {s:"43", ss:"43"}, {s:"44", ss:"44"}, {s:"45", ss:"45"}, {s:"46", ss:"46"}, 
  {s:"47", ss:"47"}, {s:"48", ss:"48"}, {s:"49", ss:"49"}, {s:"50", ss:"50"}, {s:"51", ss:"51"}, {s:"52", ss:"52"}, {s:"53", ss:"53"}, {s:"54", ss:"54"}, {s:"55", ss:"55"}, {s:"56", ss:"56"}, {s:"57", ss:"57"}, {s:"58", ss:"58"}, {s:"59", ss:"59"}], $__formatCollection$$ = {yy:$__buildFormatRegexStringFrom$$($__years$$, "yy"), yyyy:$__buildFormatRegexStringFrom$$($__years$$, "yyyy"), YY:$__buildFormatRegexStringFrom$$($__years$$, "YY"), YYYY:$__buildFormatRegexStringFrom$$($__years$$, "YYYY"), m:$__buildFormatRegexStringFrom$$($__months$$, 
  "m"), mm:$__buildFormatRegexStringFrom$$($__months$$, "mm"), mmm:$__buildFormatRegexStringFrom$$($__months$$, "mmm"), mmmm:$__buildFormatRegexStringFrom$$($__months$$, "mmmm"), M:$__buildFormatRegexStringFrom$$($__months$$, "M"), MM:$__buildFormatRegexStringFrom$$($__months$$, "MM"), MMM:$__buildFormatRegexStringFrom$$($__months$$, "MMM"), MMMM:$__buildFormatRegexStringFrom$$($__months$$, "MMMM"), d:$__buildFormatRegexStringFrom$$($__days$$, "d"), dd:$__buildFormatRegexStringFrom$$($__days$$, "dd"), 
  dth:$__buildFormatRegexStringFrom$$($__days$$, "dth"), ddth:$__buildFormatRegexStringFrom$$($__days$$, "ddth"), D:$__buildFormatRegexStringFrom$$($__weekdays$$, "D"), DD:$__buildFormatRegexStringFrom$$($__weekdays$$, "DD"), DDD:$__buildFormatRegexStringFrom$$($__weekdays$$, "DDD"), DDDD:$__buildFormatRegexStringFrom$$($__weekdays$$, "DDDD"), ddd:$__buildFormatRegexStringFrom$$($__weekdays$$, "ddd"), dddd:$__buildFormatRegexStringFrom$$($__weekdays$$, "dddd"), am:$__buildFormatRegexStringFrom$$($__hours$$, 
  "am"), AM:$__buildFormatRegexStringFrom$$($__hours$$, "AM"), h:$__buildFormatRegexStringFrom$$($__hours$$, "h"), hh:$__buildFormatRegexStringFrom$$($__hours$$, "hh"), H:$__buildFormatRegexStringFrom$$($__hours$$, "H"), HH:$__buildFormatRegexStringFrom$$($__hours$$, "HH"), n:$__buildFormatRegexStringFrom$$($__minutes$$, "n"), nn:$__buildFormatRegexStringFrom$$($__minutes$$, "nn"), s:$__buildFormatRegexStringFrom$$($__seconds$$, "s"), ss:$__buildFormatRegexStringFrom$$($__seconds$$, "ss"), xxx:!0, 
  xx:!0, x:!0};
  return $js_date$$;
});
jspyder.extend.fn("dialog", function() {
  function $js_dialog$$($cfg$$) {
    $cfg$$ = $cfg$$ || {};
    var $element$$ = $js$$.dom($js_dialog$$.fn._template), $dialog$$ = Object.create($js_dialog$$.fn, {_element:{value:$element$$}, _buttonDefs:{value:[]}});
    $dialog$$.setDimensions($cfg$$.width, $cfg$$.height);
    $element$$.find("i.button-close").on("click", function($event$$) {
      $dialog$$.remove();
    });
    $cfg$$.noclose && $element$$.find("i.button-close").remove();
    $cfg$$.title ? $dialog$$.setTitle($cfg$$.title) : $cfg$$.titleHtml && $dialog$$.setTitleHtml($cfg$$.titleHtml);
    $cfg$$.body ? $dialog$$.setBody($cfg$$.body) : $cfg$$.bodyHtml && $dialog$$.setBodyHtml($cfg$$.bodyHtml);
    $cfg$$.buttons && $dialog$$.setButtons($cfg$$.buttons);
    $cfg$$.parent && $dialog$$.attach($cfg$$.parent);
    return $dialog$$;
  }
  var $js$$ = this;
  $js_dialog$$.alert = function $$js_dialog$$$alert$($cfg$$) {
    var $dlg$$ = $js_dialog$$({titleHtml:$js$$.alg.string($cfg$$.title, "Alert"), bodyHtml:$js$$.alg.string($cfg$$.message, ""), noclose:!0, parent:$cfg$$.parent || document.body, height:$cfg$$.height, width:$cfg$$.width, buttons:[{text:"OK", value:"OK", click:function($event$$) {
      $dlg$$.remove();
      "function" === typeof $cfg$$.callback && $cfg$$.callback();
    }}]});
    return $dlg$$;
  };
  $js_dialog$$.confirm = function $$js_dialog$$$confirm$($cfg$$) {
    var $dlg$$ = $js_dialog$$({titleHtml:$js$$.alg.string($cfg$$.title, "Alert"), bodyHtml:$js$$.alg.string($cfg$$.message, ""), noclose:!0, parent:$cfg$$.parent || document.body, height:$cfg$$.height, width:$cfg$$.width, buttons:[{text:"OK", value:"OK", click:function($event$$) {
      $dlg$$.remove();
      "function" === typeof $cfg$$.callback && $cfg$$.callback(!0);
    }}, {text:"Cancel", value:"Cancel", click:function($event$$) {
      $dlg$$.remove();
      "function" === typeof $cfg$$.callback && $cfg$$.callback(!1);
    }}]});
    return $dlg$$;
  };
  $js_dialog$$.query = function $$js_dialog$$$query$($cfg$$) {
    var $dlg$$ = $js_dialog$$({titleHtml:$js$$.alg.string($cfg$$.title, "Alert"), bodyHtml:$js$$.alg.string($cfg$$.message, ""), noclose:!0, parent:$cfg$$.parent || document.body, height:$cfg$$.height, width:$cfg$$.width, buttons:[{text:"Yes", value:"Yes", click:function($event$$) {
      $dlg$$.remove();
      "function" === typeof $cfg$$.callback && $cfg$$.callback(!0);
    }}, {text:"No", value:"No", click:function($event$$) {
      $dlg$$.remove();
      "function" === typeof $cfg$$.callback && $cfg$$.callback(!1);
    }}]});
    return $dlg$$;
  };
  $js_dialog$$.fn = {_element:null, _buttonDefs:null, _template:'<div class="js-dialog-background"><div class="js-dialog"><div class="js-dialog-header"><span class="title-container"></span><span class="dialog-buttons"><i class="button-close close"></i></span></div><div class="js-dialog-body"><div class="body-container"></div></div><div class="js-dialog-footer"><div class="footer-container"></div></div></div></div>', _height:237.2, _width:498, _buttonFactory:function $$js_dialog$$$fn$_buttonFactory$($html$$1_text$$) {
    $html$$1_text$$ = ["<div>", $html$$1_text$$, "</div>"].join("");
    return $js$$.dom($html$$1_text$$);
  }, setBody:function $$js_dialog$$$fn$setBody$($body$$) {
    this._element && this._element.find(".body-container").setHtml("").append($body$$);
    return this;
  }, setBodyHtml:function $$js_dialog$$$fn$setBodyHtml$($body$$) {
    this._element && this._element.find(".body-container").setHtml($body$$);
    return this;
  }, setTitle:function $$js_dialog$$$fn$setTitle$($title$$) {
    this._element && this._element.find(".title-container").setHtml("").append($title$$);
    return this;
  }, setTitleHtml:function $$js_dialog$$$fn$setTitleHtml$($title$$) {
    this._element && this._element.find(".title-container").setHtml($title$$);
    return this;
  }, setButtons:function $$js_dialog$$$fn$setButtons$($buttons$$) {
    if (this._element) {
      var $container$$ = this._element.find(".footer-container").setHtml(""), $form$$ = $js$$.form();
      $js$$.alg.each($buttons$$, function($button$$, $i$$) {
        $button$$ = $js$$.alg.mergeObj({}, $button$$, {type:"button"});
        $form$$.addField("button-" + $i$$, $button$$);
        $container$$.append($form$$.exportField("button-" + $i$$));
      });
    }
    return this;
  }, setDimensions:function $$js_dialog$$$fn$setDimensions$($width$$, $height$$) {
    return this.setHeight($height$$).setWidth($width$$);
  }, setHeight:function $$js_dialog$$$fn$setHeight$($height$$) {
    this._element && ($height$$ = $js$$.alg.number($height$$, this._height) + "px", this._element.find(".js-dialog-body").setCss({"max-height":$height$$}));
    return this;
  }, setWidth:function $$js_dialog$$$fn$setWidth$($width$$) {
    this._element && ($width$$ = $js$$.alg.number($width$$, this._width) + "px", this._element.find(".js-dialog-body").setCss({width:$width$$}));
    return this;
  }, attach:function $$js_dialog$$$fn$attach$($parent$$) {
    this._element && this._element.attach($parent$$);
    return this;
  }, remove:function $$js_dialog$$$fn$remove$() {
    this._element && this._element.remove();
    return this;
  }};
  return $js_dialog$$;
});
js.extend.fn("download", function() {
  function $download$$($def$$) {
    var $dl$$ = Object.create($download$$.fn);
    $def$$ = $def$$ || {};
    $dl$$.setName($def$$.name).setType($def$$.type).setData($def$$.data).setCharset($def$$.charset);
    return $dl$$;
  }
  function $__save$$($filereader_name$$, $type$$, $blob$$) {
    $type$$ = js.alg.string($type$$, $safeType$$);
    if ($__reDataUrl$$.test($blob$$)) {
      return $saveBlob$$ ? $saveBlob$$($__encode$$($blob$$), $filereader_name$$) : $__triggerSave$$($blob$$);
    }
    $blob$$ = $blob$$ instanceof $Blob$$ ? $blob$$ : new $Blob$$([$blob$$], {type:$type$$});
    if ($saveBlob$$) {
      return $saveBlob$$($blob$$, $filereader_name$$);
    }
    if ($URL$$) {
      return $__triggerSave$$($filereader_name$$, $URL$$.createObjectURL($blob$$));
    }
    if ("string" === typeof $blob$$ || $blob$$ instanceof String) {
      return $__triggerSave$$("data:" + $type$$ + $__decode$$($blob$$));
    }
    $filereader_name$$ = new FileReader;
    $filereader_name$$.onload = function $$filereader_name$$$onload$($e$$) {
      $__triggerSave$$(this.result);
    };
    $filereader_name$$.readAsDataURL($blob$$);
    return !0;
  }
  function $__triggerSave$$($filename$$, $url$$) {
    var $props$$ = {download:null}, $attrs$$ = {href:$url$$, download:$filename$$}, $$a$$ = js.dom("<a></a>").getProps($props$$);
    null !== $props$$.download ? $$a$$.setAttrs($attrs$$).trigger("click") : "Safari" === js.env.browser.name ? ($url$$ = "data:" + $url$$.replace($__replaceUrl$$, saveLink), window.open($url$$) || (location.href = $url$$)) : ($url$$ = "data:" + $url$$.replace($__replaceUrl$$, saveLink), js.dom("<iframe></iframe>").setCss({position:"fixed", left:"-9000000px", width:"1em", height:"1em"}).setProps({src:$url$$}).on("load", function($event$$) {
      $frame.remove();
    }).attach(document.body));
    return !0;
  }
  $download$$.fn = {save:function $$download$$$fn$save$($def$$) {
    $def$$ = $def$$ || {};
    $__save$$($def$$.name || this._name, $def$$.type || this._type, $def$$.data || this._data);
    return this;
  }, saveText:function $$download$$$fn$saveText$($def$$) {
    $def$$ = $def$$ || {};
    $__saveText$$($def$$.data || this._data, $def$$.name || this._name, $def$$.charset || this._charset);
    return this;
  }, saveMime:function $$download$$$fn$saveMime$($charset$$1_def$$) {
    $charset$$1_def$$ = $charset$$1_def$$ || {};
    var $name$$ = ($charset$$1_def$$.name || this._name).split("."), $data$$ = $charset$$1_def$$.data || this._data, $type$$ = $charset$$1_def$$.type || this._type;
    $charset$$1_def$$ = $charset$$1_def$$.charset || this._charset;
    var $extension$$ = ".txt";
    1 < $name$$.length && ($extension$$ = $name$$.pop());
    $name$$ = $name$$.join("");
    $__saveTextWithMime$$($data$$, $name$$, $extension$$, $type$$, $charset$$1_def$$);
    return this;
  }, setName:function $$download$$$fn$setName$($name$$) {
    this._name = js.alg.string($name$$, "download");
    return this;
  }, getName:function $$download$$$fn$getName$() {
    return this._name;
  }, setType:function $$download$$$fn$setType$($type$$) {
    this._type = js.alg.string($type$$, $safeType$$);
    return this;
  }, getType:function $$download$$$fn$getType$() {
    return this._type;
  }, setData:function $$download$$$fn$setData$($data$$) {
    this._data = $data$$ || "";
    return this;
  }, getData:function $$download$$$fn$getData$() {
    return this._data;
  }, setCharset:function $$download$$$fn$setCharset$($charset$$) {
    this._charset = $charset$$ || "UTF-8";
    return this;
  }, getCharset:function $$download$$$fn$getCharset$() {
    return this._charset;
  }};
  var $win$$ = window, $safeType$$ = "application/octet-stream", $URL$$ = window.URL || window.webkitURL || window, $Blob$$ = $win$$.Blob || $win$$.MozBlob || $win$$.WebKitBlob, $saveBlob$$ = $win$$.navigator.msSaveOrOpenBlob || $win$$.navigator.msSaveBlob, $__decode$$ = function $$__decode$$$($text$$0$$) {
    var $btoa$$ = $win$$.btoa;
    $__decode$$ = $win$$.btoa ? function($text$$) {
      return ";base64," + $btoa$$($text$$);
    } : function($text$$) {
      return "," + encodeURIComponent($text$$);
    };
    return $__decode$$($text$$0$$);
  }, $__encode$$ = function $$__encode$$$($data$$, $type$$) {
    var $p$$5_size$$ = $data$$.split(/[:;,]/);
    $type$$ = $p$$5_size$$[1];
    var $binary$$ = ("base64" === $p$$5_size$$[2] ? atob : decodeURIComponent)($p$$5_size$$.pop()), $p$$5_size$$ = $binary$$.length, $arr$$ = new Uint8Array($p$$5_size$$);
    js.alg.iterate(0, $p$$5_size$$, function($i$$) {
      $arr$$[$i$$] = $binary$$.charCodeAt($i$$);
    });
    return new $Blob$$([$arr$$], {type:$type$$});
  }, $__reDataUrl$$ = /^data\:[\w+\-]+\/[\w+\-]+[,;]/, $__replaceUrl$$ = /^data:([\w\/\-\+]+)/, $__encoding$$ = {"UTF-8":"", "UTF-16":"\ufeff", "UTF-32":"\x00\ufeff", "UTF-7":"+/v8", "UTF-1":"\u00f7dL"}, $__saveTextWithMime$$ = function $$__saveTextWithMime$$$($content$$, $filename$$0$$, $extension$$0$$, $dataType$$, $charset$$0$$) {
    $__saveTextWithMime$$ = window.Blob ? function($blob$$7_content$$, $filename$$, $extension$$, $dataType$$, $charset$$) {
      $charset$$ = js.alg.string($charset$$, "UTF-8");
      $filename$$ = js.alg.string($filename$$, "download");
      $blob$$7_content$$ = new window.Blob([($__encoding$$[$charset$$] || "") + ($blob$$7_content$$ || "")], {type:$dataType$$ + ";charset=" + $charset$$});
      $__save$$($filename$$, $dataType$$, $blob$$7_content$$);
    } : "IE" === js.env.browser && 9 >= js.env.browserVersion ? function($content$$, $filename$$, $extension$$, $dataType$$, $charset$$) {
      $charset$$ = js.alg.string($charset$$, "UTF-8");
      $filename$$ = js.alg.string($filename$$, "download");
      $content$$ = $content$$ || "";
      js.dialog.alert({title:"Alert", message:["Because you are using Internet Explorer ", js.env.browserVersion, ', your download "', $filename$$, ".", $extension$$, '" has been changed to "', $filename$$, '.txt".  It is recommended that this value be changed in the save menu, or after the file has been downloaded.'].join("")});
      $__saveText$$($content$$, $filename$$, $charset$$);
    } : function($content$$, $filename$$, $extension$$, $dataType$$, $charset$$) {
      $charset$$ = js.alg.string($charset$$, "UTF-8");
      $filename$$ = js.alg.string($filename$$, "download");
      $__saveText$$($content$$ || "", $filename$$ + "." + $extension$$, $charset$$);
    };
    return $__saveTextWithMime$$.apply(this, arguments);
  }, $__saveText$$ = function $$__saveText$$$($content$$0$$, $name$$0$$, $charset$$0$$) {
    $content$$0$$ = $content$$0$$.replace(/\r?\n/g, "\r\n");
    $__saveText$$ = window.Blob ? function($blob$$8_content$$, $name$$, $charset$$) {
      $charset$$ = js.alg.string($charset$$, "UTF-8");
      $name$$ = js.alg.string($name$$, "download");
      $blob$$8_content$$ = new $Blob$$([$blob$$8_content$$ || ""], {type:"text/plain;charset=" + $charset$$});
      $__save$$($name$$, "text/text", $blob$$8_content$$);
    } : function($content$$, $name$$, $charset$$) {
      $charset$$ = js.alg.string($charset$$, "UTF-8");
      $name$$ = js.alg.string($name$$, "download");
      $content$$ = $content$$ || "";
      var $ret$$ = "";
      js.dom("<iframe></iframe>").setCss({display:"none"}).attach(document.body).element(0, function($el$$) {
        $el$$.document.open("text/html", "replace");
        $el$$.document.charset = $charset$$;
        /(.html|.htm)$/i.test($name$$) ? ($el$$.document.close(), $el$$.document.body.innerHTML = "\r\n" + $content$$ + "\r\n") : (/.txt$/i.test($name$$) || ($name$$ += ".txt"), $el$$.document.write($content$$), $el$$.document.close());
        $ret$$ = $el$$.document.execCommand("SaveAs", null, $name$$);
        $el$$.close();
      });
      return $ret$$;
    };
    return $__saveText$$.apply(this, arguments);
  };
  return $download$$;
});
jspyder.extend.fn("dtype", function() {
  function $js_dtype$$($obj$$, $fn$$) {
    var $dtype$$ = Object.create($js_dtype$$);
    $dtype$$.obj = $obj$$;
    js.alg.use($dtype$$, $obj$$);
    return $dtype$$;
  }
  function $_typeError$$($name$$, $val$$, $eType$$) {
    return new TypeError("Attempted to assign " + typeof $val$$ + "(" + $val$$ + ") to " + $eType$$ + ' "' + $name$$ + '"');
  }
  function $_constError$$($name$$, $eType$$) {
    return new TypeError("Attempted to set a value to a constant " + $eType$$ + ' "' + $name$$ + '"');
  }
  $js_dtype$$.ubyte = function attachUByte($name$$, $value$$, $strict$$, $constant$$) {
    var $data$$ = new Uint8Array(new ArrayBuffer(1)), $_constant$$ = !1, $o$$ = this.obj, $_interface$$ = {get:function() {
      return $data$$[0];
    }, set:function($v$$) {
      if ($_constant$$) {
        throw $_constError$$($name$$, "unsigned byte");
      }
      if ($strict$$ && ("number" !== typeof $v$$ || $v$$ !== $v$$)) {
        throw $_typeError$$($name$$, $v$$, "unsigned byte");
      }
      $data$$[0] = $v$$;
      return $data$$[0];
    }, enumerable:!0};
    $_interface$$.set($value$$);
    $_constant$$ = $constant$$;
    Object.defineProperty($o$$, $name$$, $_interface$$);
    return this;
  };
  $js_dtype$$.string = function attachString($name$$, $value$$, $strict$$, $constant$$) {
    var $data$$ = String($value$$), $_constant$$ = !1, $o$$ = this.obj, $_interface$$ = {get:function() {
      return $data$$;
    }, set:function($v$$) {
      if ($_constant$$) {
        throw $_constError$$($name$$, "string");
      }
      if ($strict$$ && "string" !== typeof $v$$) {
        throw $_typeError$$($name$$, $v$$, "string");
      }
      return $data$$ = String($v$$);
    }, enumerable:!0};
    $_interface$$.set($value$$);
    $_constant$$ = $constant$$;
    Object.defineProperty($o$$, $name$$, $_interface$$);
    return this;
  };
  $js_dtype$$.uchar = function attachChar($name$$, $value$$, $strict$$, $constant$$) {
    var $data$$ = new Uint16Array(new ArrayBuffer(2)), $_constant$$ = !1, $o$$ = this.obj, $_interface$$ = {get:function() {
      return String.fromCharCode($data$$[0]);
    }, set:function($v$$) {
      if ($_constant$$) {
        throw $_constError$$($name$$, "uchar");
      }
      var $str$$ = "string" === typeof $v$$ && 1 === $v$$.length;
      if ($strict$$ && !$str$$ && ("number" !== typeof $v$$ || $v$$ !== $v$$)) {
        throw $_typeError$$($name$$, $v$$, "uchar");
      }
      $data$$[0] = "string" === typeof $v$$ ? $v$$.charCodeAt(0) : +$v$$;
    }, enumerable:!0};
    $_interface$$.set($value$$);
    $_constant$$ = $constant$$;
    Object.defineProperty($o$$, $name$$, $_interface$$);
    return this;
  };
  $js_dtype$$.jsstring = function attachJsString($name$$, $value$$, $strict$$, $constant$$) {
    var $data$$ = "", $_constant$$ = !1, $o$$ = this.obj, $_interface$$ = {get:function() {
      return $data$$.join("");
    }, set:function($v$$) {
      if ($_constant$$) {
        throw $_constError$$($name$$, "jsstring");
      }
      if ($strict$$ && "string" !== typeof $v$$) {
        throw $_typeError$$($name$$, $v$$, "jsstring");
      }
      if ("undefined" === typeof $v$$ || null === $v$$) {
        $v$$ = "";
      }
      $data$$ = $v$$;
    }, enumerable:!0};
    $_interface$$.set($value$$);
    $_constant$$ = $constant$$;
    Object.defineProperty($o$$, $name$$, $_interface$$);
    return this;
  };
  return $js_dtype$$;
});
jspyder.extend.fn("form", function() {
  function $js_form$$($config$$, $fn$$) {
    var $form$$ = Object.create($js_form$$.fn, {_dom:{value:$js$$.dom("<form></form>")}, _template:{value:{}}});
    $config$$ && ($config$$.success && ($form$$._success = $config$$.success), $config$$.failure && ($form$$._failure = $config$$.failure), $config$$.reset && ($form$$._reset = $config$$.reset), $config$$.fields && $form$$.addFields($config$$.fields));
    "function" === typeof $fn$$ && $fn$$.apply(this);
    return $form$$;
  }
  var $js$$ = this;
  $js_form$$.fn = {_success:function $$js_form$$$fn$_success$($values$$, $invalid$$) {
    return this;
  }, _failure:function $$js_form$$$fn$_failure$($values$$, $invalid$$) {
    return this;
  }, _reset:function $$js_form$$$fn$_reset$() {
    return this;
  }, _dom:null, _fields:null, each:function $$js_form$$$fn$each$($fn$$, $data$$) {
    $js$$.alg.each(this._fields, $fn$$, $data$$);
    return this;
  }, addFields:function $$js_form$$$fn$addFields$($fields$$) {
    for (var $name$$ in $fields$$) {
      this.addField($name$$, $fields$$[$name$$]);
    }
    return this;
  }, addField:function $$js_form$$$fn$addField$($name$$, $config$$) {
    $name$$ = $js$$.alg.string($name$$, "");
    $config$$ = $js$$.alg.object($config$$, {});
    var $cfg$$ = Object.create($js_form$$.fn.fieldTemplate), $$field$$;
    $js$$.alg.mergeObj($cfg$$, $config$$, {name:$name$$, "default":$config$$.default, value:$config$$.value, values:$js$$.alg.sliceArray($config$$.values)});
    $$field$$ = this.buildControl($cfg$$);
    this._fields || (this._fields = {});
    this._fields[$name$$] = {type:$cfg$$.type, field:$$field$$, validate:$cfg$$.validate, exportValue:$cfg$$.exportValue, getValue:$cfg$$.getValue, setValue:$cfg$$.setValue, ignore:$cfg$$.ignore, config:$cfg$$};
    this.resetFieldValue($name$$);
    return this;
  }, registerControl:function $$js_form$$$fn$registerControl$($typename$$, $constructor$$) {
    $js_form$$.fn.templates[$typename$$] = $constructor$$;
    return this;
  }, registerControlFn:function $$js_form$$$fn$registerControlFn$($typename$$, $preconstructor$$) {
    return this.registerControl($typename$$, $js$$.alg.use(this, $preconstructor$$));
  }, buildControl:function $$js_form$$$fn$buildControl$($config$$, $nolabel$$) {
    var $ctl$$ = (this.templates[$config$$.type] || this.templates.input).apply(this, [$config$$]), $fieldname_lbl$$ = $js$$.alg.string($config$$.name), $labeltext$$ = $js$$.alg.string($config$$.text), $uselabel$$ = !$js$$.alg.bool($config$$.nolabel, $nolabel$$), $fieldname_lbl$$ = this.buildLabel($uselabel$$ && $fieldname_lbl$$, $uselabel$$ && $labeltext$$, $config$$.class, $config$$.tooltip), $form$$ = this;
    $js$$.alg.each($config$$.events, function($callback$$, $event$$0$$) {
      $ctl$$.on($event$$0$$, function($event$$) {
        $js$$.alg.use(this, $callback$$, [$event$$, $form$$]);
      });
    });
    return $fieldname_lbl$$.and($ctl$$);
  }, buildLabel:function $$js_form$$$fn$buildLabel$($fieldname$$1_html$$, $labeltext$$, $labelclass$$, $tooltip$$) {
    $fieldname$$1_html$$ = $fieldname$$1_html$$ && $labeltext$$ ? ['<label for="', $fieldname$$1_html$$, '" class="', $labelclass$$, '"', $tooltip$$ ? 'title="' + $tooltip$$ + '"' : "", ">", $labeltext$$, "</label>"].join("") : "";
    return $js$$.dom($fieldname$$1_html$$);
  }, getField:function $$js_form$$$fn$getField$($name$$, $fn$$) {
    var $field$$ = this.exportField($name$$);
    $js$$.alg.use(this, $fn$$, [$field$$]);
    return this;
  }, exportField:function $$js_form$$$fn$exportField$($data$$54_name$$) {
    return ($data$$54_name$$ = this.exportFieldData($data$$54_name$$)) ? $data$$54_name$$.field : null;
  }, getFieldData:function $$js_form$$$fn$getFieldData$($name$$, $fn$$) {
    var $data$$ = this.exportFieldData($name$$);
    $js$$.alg.use(this, $fn$$, [$data$$]);
    return this;
  }, exportFieldData:function $$js_form$$$fn$exportFieldData$($name$$) {
    return this._fields[$name$$] || null;
  }, resetFieldValue:function $$js_form$$$fn$resetFieldValue$($name$$) {
    var $data$$56_val$$ = this.exportFieldData($name$$), $dval$$ = $data$$56_val$$.config.default, $data$$56_val$$ = $data$$56_val$$.config.value;
    this.setFieldValue($name$$, "undefined" !== typeof $data$$56_val$$ ? $data$$56_val$$ : $dval$$);
    return this;
  }, resetFieldValues:function $$js_form$$$fn$resetFieldValues$() {
    this.each(this._resetFieldValues, this);
  }, _resetFieldValues:function $$js_form$$$fn$_resetFieldValues$($field$$, $name$$, $fields$$, $form$$) {
    $form$$.resetFieldValue($name$$);
  }, setFieldValue:function $$js_form$$$fn$setFieldValue$($name$$, $value$$) {
    var $data$$ = this.exportFieldData($name$$), $field$$ = this.exportField($name$$);
    $field$$ && ($data$$ && $data$$.setValue ? $js$$.alg.use($field$$, $data$$.setValue, [$data$$, $value$$]) : $field$$.setValue($value$$));
    return this;
  }, getFieldValue:function $$js_form$$$fn$getFieldValue$($name$$, $fn$$) {
    var $args$$ = [this.exportFieldValue($name$$)];
    $js$$.alg.use(this, $fn$$, $args$$);
    return this;
  }, exportFieldValue:function $$js_form$$$fn$exportFieldValue$($field$$6_name$$) {
    var $data$$ = this.exportFieldData($field$$6_name$$);
    $field$$6_name$$ = this.exportField($field$$6_name$$);
    var $value$$ = null;
    $field$$6_name$$ && ($data$$ && $data$$.exportValue ? $value$$ = $js$$.alg.use($field$$6_name$$, $data$$.exportValue, [$data$$]) : $data$$ && $data$$.getValue ? $js$$.alg.use($field$$6_name$$, $data$$.getValue, [$data$$, function($v$$) {
      $value$$ = $v$$;
    }]) : $value$$ = $field$$6_name$$.exportValue());
    return $value$$;
  }, templates:{}, values:function $$js_form$$$fn$values$($fn$$) {
    var $values$$ = {}, $$field$$, $name$$, $_export$$ = function $$_export$$$($v$$) {
      $values$$[$name$$] = $$field$$;
    };
    for ($name$$ in this._fields) {
      $$field$$ = this._fields[$name$$].field, $values$$[$name$$] = null, $$field$$.getValue($_export$$);
    }
    $fn$$.apply(this, [$values$$]);
    return this;
  }, fieldTemplate:{type:"input", values:[]}, submit:function $$js_form$$$fn$submit$($onSuccess$$, $onFail$$) {
    $onSuccess$$ = "function" === typeof $onSuccess$$ ? $onSuccess$$ : this._success;
    $onFail$$ = "function" === typeof $onFail$$ ? $onFail$$ : this._failure;
    this.validate(function($valid$$, $invalid$$) {
      $js$$.alg.use(this, $invalid$$ ? $onFail$$ : $onSuccess$$, [$valid$$, $invalid$$]);
    });
    return this;
  }, reset:function $$js_form$$$fn$reset$($fn$$) {
    this.resetFieldValues();
    $js$$.alg.use(this, "function" === typeof $fn$$ ? $fn$$ : this._reset);
    return this;
  }, validate:function $$js_form$$$fn$validate$($fn$$) {
    var $form$$ = this, $valid$$ = {}, $invalid$$ = null;
    this.each(function($field$$, $name$$) {
      var $isValid$$ = !0, $value$$ = $form$$.exportFieldValue($name$$);
      if (!$field$$.ignore) {
        switch(typeof $field$$.validate) {
          case "function":
            $isValid$$ = $field$$.validate($form$$);
            break;
          case "boolean":
            $isValid$$ = $field$$.validate;
        }
        $field$$.config.required && !$value$$ && ($isValid$$ = !1);
        ($isValid$$ ? $valid$$ : $invalid$$ || ($invalid$$ = {}))[$name$$] = $value$$;
      }
    });
    $fn$$.apply(this, [$valid$$, $invalid$$]);
    return this;
  }, attach:function $$js_form$$$fn$attach$($fn$$, $data$$) {
    var $dom$$ = this._dom, $fields$$ = this._fields, $name$$;
    for ($name$$ in $fields$$) {
    }
    "function" === typeof $fn$$ && $fn$$.apply($dom$$, [this, $dom$$, $data$$]);
    return this;
  }, compile:function $$js_form$$$fn$compile$($templateId$$, $data$$, $fn$$) {
    return this._compiler($templateId$$, $data$$, $fn$$, "compile");
  }, compileExplicit:function $$js_form$$$fn$compileExplicit$($template$$, $data$$, $fn$$) {
    return this._compiler($template$$, $data$$, $fn$$, "compileExplicit");
  }, compileDom:function $$js_form$$$fn$compileDom$($dom$$, $data$$, $fn$$) {
    if (($dom$$ = $js$$.dom($dom$$)) && $dom$$.getHtml) {
      var $form$$ = this;
      $dom$$.getHtml(function($html$$) {
        $form$$._compiler($html$$, $data$$, $fn$$, $dom$$);
      });
    }
    return this;
  }, _compiler:function $$js_form$$$fn$_compiler$($template$$, $data$$, $fn$$, $compile$$) {
    var $dom$$ = null;
    if ("string" !== typeof $compile$$) {
      $dom$$ = $compile$$;
    } else {
      $js$$.template($data$$)[$compile$$]($template$$, null, function($text$$) {
        $dom$$ = $js$$.dom($text$$);
      });
    }
    this._dom = $dom$$;
    var $fields$$ = {};
    $js$$.alg.each(this._fields, function($fieldSet$$, $name$$) {
      $fields$$[$name$$] = $fieldSet$$.field;
    });
    $dom$$.template($fields$$ || {});
    "function" === typeof $fn$$ && $fn$$.apply(this, [$dom$$]);
    return $dom$$;
  }};
  $js_form$$.registerControl = $js_form$$.fn.registerControl;
  $js_form$$.registerControlFn = $js_form$$.fn.registerControlFn;
  $js_form$$.registerControlFn("input", function() {
    function $setValue$$($data$$, $v$$) {
      this.setValue($js$$.alg.string($v$$));
    }
    return function($cfg$$) {
      var $fieldname$$2_html$$ = $js$$.alg.string($cfg$$.name), $fieldclass$$ = $js$$.alg.string($cfg$$.class), $fieldtype$$ = $js$$.alg.string($cfg$$.type, "text"), $fieldname$$2_html$$ = ['<input class="', $fieldclass$$, '" name="', $fieldname$$2_html$$, '"', $cfg$$.readonly ? ' readonly="readonly"' : "", ' data-type="', $fieldtype$$, '"></input>'].join("");
      $cfg$$.setValue = $setValue$$;
      return $js$$.dom($fieldname$$2_html$$);
    };
  }).registerControlFn("date", function() {
    function $__calStructFactory$$($config$$) {
      var $calStruct$$ = Object.create($__calStructFactory$$.fn);
      $calStruct$$.today = $js$$.date();
      $calStruct$$.date = $js$$.date($config$$.value, $config$$.format);
      $calStruct$$.format = $js$$.alg.string($config$$.format, $calStruct$$.format);
      return $calStruct$$;
    }
    $__calStructFactory$$.fn = {dom:null, title:null, tiles:null, prev:null, next:null, input:null, today:null, date:null, DOCDOM:$js$$.dom(document.documentElement), navMonth:!1, titleMonth:"mmm yyyy", titleYear:"yyyy", format:"yyyy-mm-dd", clear:function $$__calStructFactory$$$fn$clear$() {
      this.dom && this.dom.remove();
      this.input = this.next = this.prev = this.tiles = this.title = this.dom = null;
      this.navMonth = !1;
      this.today = $js$$.date();
      return this;
    }, load:function $$__calStructFactory$$$fn$load$() {
      var $jsdom$$ = $js$$.dom(this.calendarHtml), $self$$ = this;
      this.today = $js$$.date();
      this.dom = $jsdom$$;
      this.title = $jsdom$$.find(".date-picker-title");
      this.tiles = $jsdom$$.find(".calendar-tiles");
      this.prev = $jsdom$$.find(".date-picker-prev");
      this.next = $jsdom$$.find(".date-picker-next");
      this.prev.on("click", function($event$$) {
        $self$$.prevNextClick(-1);
      });
      this.next.on("click", function($event$$) {
        $self$$.prevNextClick(1);
      });
      this.setTitle();
      this.monthlistInit();
      $jsdom$$.on("click", this.preventClose);
      return this;
    }, setTitle:function $$__calStructFactory$$$fn$setTitle$($override$$) {
      var $self$$ = this;
      $self$$.title.setHtml(this.date.asString(this.navMonth ? this.titleMonth : this.titleYear));
      this.input.getValue(function($v$$) {
        ($override$$ || $v$$) && this.setValue($self$$.date.asString(this.format));
      });
      return this;
    }, setTiles:function $$__calStructFactory$$$fn$setTiles$($data$$) {
      this.tiles.setHtml($data$$);
      return this;
    }, enableClose:function $$__calStructFactory$$$fn$enableClose$() {
      this.pause = !1;
    }, preventClose:function $$__calStructFactory$$$fn$preventClose$() {
      this.pause = !0;
    }, prevNextClick:function $$__calStructFactory$$$fn$prevNextClick$($val$$) {
      this.date[this.navMonth ? "addMonths" : "addYears"]($val$$);
      this.setTitle();
      this.navMonth ? this.monthClick(this) : this.monthlistInit();
      this.preventClose();
    }, monthlistInit:function $$__calStructFactory$$$fn$monthlistInit$() {
      function $copyValue$$($v$$) {
        $calStruct$$.date.setMonth($v$$);
        $calStruct$$.monthClick($calStruct$$);
      }
      var $calStruct$$ = this;
      this.months = "";
      $js$$.alg.arrEach(this.date.getMonthList("mmm"), this.monthlistBuilder, this);
      this.setTiles($calStruct$$.months);
      this.tiles.find(".month").on("click", function __monthClick($event$$) {
        $js$$.dom(this).getValue($copyValue$$);
      });
    }, monthlistBuilder:function $$__calStructFactory$$$fn$monthlistBuilder$($month$$, $monthnum$$, $months$$, $data$$) {
      $months$$ = $data$$.today.getYear() === $data$$.date.getYear();
      var $sameMonth$$ = $monthnum$$ + 1 === $data$$.today.getMonth();
      $data$$.months += ['<div class="month ', $months$$ && $sameMonth$$ ? "today" : "", '" value="', $monthnum$$ + 1, '">', $month$$, "</div>"].join("");
    }, monthClick:function $$__calStructFactory$$$fn$monthClick$() {
      var $calStruct$$ = this;
      $calStruct$$.today = $js$$.date();
      var $weekdays$$ = $calStruct$$.date.getWeekdayList("DD"), $daylist$$ = $calStruct$$.date.getDayList("d"), $i$$ = 0, $data$$ = {html:"", wlen:$weekdays$$.length, offset:$calStruct$$.date.getWeekdayOffset(), calStruct:$calStruct$$, today:$calStruct$$.today.getMonth() === $calStruct$$.date.getMonth() && $js$$.date().getDay()};
      for ($js$$.alg.arrEach($weekdays$$, $calStruct$$.buildWeekdays, $data$$);$i$$ < $data$$.offset;) {
        this.buildNumberedDays("", $i$$ - $data$$.offset, null, $data$$), $i$$++;
      }
      $js$$.alg.arrEach($daylist$$, this.buildNumberedDays, $data$$);
      $calStruct$$.navMonth = !0;
      $calStruct$$.setTiles($data$$.html);
      $calStruct$$.tiles.find(".date").on("click", function($event$$) {
        $js$$.dom(this).getValue(function($v$$) {
          $calStruct$$.date.setDay($v$$);
          $calStruct$$.setTitle(!0);
        });
        $calStruct$$.enableClose();
      });
      $calStruct$$.setTitle();
      $calStruct$$.preventClose();
    }, buildWeekdays:function $$__calStructFactory$$$fn$buildWeekdays$($weekday$$, $daynum$$, $daylist$$, $data$$) {
      $data$$.html += ['<div class="date-title date-title-index-', $daynum$$ + 1, '" style="width:', 100 / $data$$.wlen, '%">', $weekday$$, "</div>"].join("");
    }, buildNumberedDays:function $$__calStructFactory$$$fn$buildNumberedDays$($day$$, $daynum$$, $daylist$$, $data$$) {
      var $sameYear$$ = $data$$.calStruct.today.getYear() === $data$$.calStruct.date.getYear(), $sameMonth$$ = $data$$.calStruct.today.getMonth() === $data$$.calStruct.date.getMonth(), $sameDate$$ = $data$$.calStruct.today.getDay() === $daynum$$ + 1;
      $data$$.html += ['<div class="date ', $sameYear$$ && $sameMonth$$ && $sameDate$$ ? "today" : "", '" value="', $daynum$$ + 1, '" style="width:', 100 / $data$$.wlen, "%;", $js$$.alg.bool($daylist$$) ? "" : "visibility: hidden;", '">', $day$$, "</div>"].join("");
    }, calendarHtml:'<div class="js-control js-control-date-picker"><div class="date-picker-header"><i class="chevron-left date-picker-prev"></i><h4 class="date-picker-title">${YEAR}</h4><i class="chevron-right date-picker-next"></i></div><div class="calendar-tiles"></div></div>'};
    var $__override$$ = {type:"input"};
    return function($cfg$$) {
      var $$datepicker$$ = this.buildControl($js$$.alg.mergeObj({}, $cfg$$, $__override$$), !0), $calStruct$$ = $__calStructFactory$$($cfg$$);
      $$datepicker$$.filter("input").on("click", function($attrs$$8_dateVal_event$$) {
        $attrs$$8_dateVal_event$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$8_dateVal_event$$);
        $attrs$$8_dateVal_event$$.readonly || ($attrs$$8_dateVal_event$$ = this.value || $cfg$$.value || $cfg$$.default || new Date, $calStruct$$.clear(), $calStruct$$.input = $js$$.dom(this), $calStruct$$.date.setDate($attrs$$8_dateVal_event$$, $calStruct$$.format), $calStruct$$.load().preventClose(), $js$$.dom(this.parentNode).append($calStruct$$.dom), $calStruct$$.DOCDOM.on("click", function __docClick($event$$) {
          if ($calStruct$$.pause) {
            return $calStruct$$.enableClose();
          }
          $calStruct$$.clear();
          $calStruct$$.DOCDOM.off("click", __docClick);
        }));
      });
      $cfg$$.exportValue = function $$cfg$$$exportValue$() {
        return $$datepicker$$.exportValue() ? $calStruct$$.date.asDate() : null;
      };
      $cfg$$.setValue = function $$cfg$$$setValue$($data$$, $value$$) {
        $calStruct$$.date.setDate($value$$ || NaN, $calStruct$$.format);
        this.setValue($calStruct$$.date.asString($calStruct$$.format));
      };
      return $$datepicker$$;
    };
  }).registerControlFn("button", function() {
    function $__clickFactory$$($form$$, $fn$$) {
      return function($event$$) {
        var $attrs$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$);
        $attrs$$.readonly || $js$$.alg.use(this, $fn$$, [$event$$, $form$$]);
      };
    }
    return function button($cfg$$) {
      $cfg$$.nolabel = !0;
      var $btnclass_html$$ = $js$$.alg.string($cfg$$.class, ""), $btnicon$$ = $js$$.alg.string($cfg$$.icon, ""), $btntext$$ = $js$$.alg.string($cfg$$.text, ""), $btnname$$ = $js$$.alg.string($cfg$$.name, ""), $btnvalue$$ = $js$$.alg.string($cfg$$.value, ""), $btnclass_html$$ = ['<div class="js-control js-control-button ', $btnclass_html$$, '"', $cfg$$.readonly ? ' readonly="true"' : "", ' name="', $btnname$$, '">', '<i class="' + $btnicon$$ + '"></i>', '<span class="button-text" data-buttontext="' + 
      $btntext$$ + '"></span>', "</div>"].join("");
      return $js$$.dom($btnclass_html$$).setValue($btnvalue$$).on("click", $__clickFactory$$(this, $cfg$$.click));
    };
  }).registerControlFn("buttonset", function() {
    var $__override$$ = {type:"button"};
    return function($cfg$$) {
      for (var $buttons$$ = $js$$.dom(), $i$$ = 0;$i$$ < $cfg$$.buttons.length;$i$$++) {
        var $option$$ = $js$$.alg.mergeObj({readonly:$cfg$$.readonly}, $cfg$$.buttons[$i$$], $__override$$);
        $option$$.class += " js-buttonset";
        $buttons$$.and(this.buildControl($option$$, !0));
      }
      return $buttons$$;
    };
  }).registerControlFn("submit", function() {
    function $__submitClickFactory$$($form$$) {
      return function __submitClick($attrs$$10_event$$) {
        $attrs$$10_event$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$10_event$$);
        $attrs$$10_event$$.readonly || $form$$.submit();
      };
    }
    var $__override$$ = {type:"button", nolabel:!0};
    return function submit($$button$$1_cfg$$) {
      $$button$$1_cfg$$ = this.buildControl($js$$.alg.mergeObj($$button$$1_cfg$$, $__override$$), !0);
      $$button$$1_cfg$$.on("click", $__submitClickFactory$$(this));
      return $$button$$1_cfg$$;
    };
  }).registerControlFn("reset", function() {
    function $__resetClickFactory$$($form$$) {
      return function __resetClick($attrs$$11_event$$) {
        $attrs$$11_event$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$11_event$$);
        $attrs$$11_event$$.readonly || $form$$.reset();
      };
    }
    var $__override$$ = {type:"button", nolabel:!0};
    return function submit($$button$$2_cfg$$) {
      $$button$$2_cfg$$ = this.buildControl($js$$.alg.mergeObj($$button$$2_cfg$$, $__override$$), !0);
      $$button$$2_cfg$$.on("click", $__resetClickFactory$$(this));
      return $$button$$2_cfg$$;
    };
  }).registerControlFn("dropdown", function() {
    function $__dropdownClickFactory$$($cfg$$) {
      return function __dropdownClick($$dropdown_event$$) {
        $$dropdown_event$$ = $js$$.dom(this);
        var $attrs$$ = {readonly:null};
        $$dropdown_event$$.getAttrs($attrs$$);
        $attrs$$.readonly || $__createPopout$$($$dropdown_event$$, $cfg$$);
      };
    }
    function $__createPopout$$($$dropdown$$, $cfg$$) {
      function $__copyValue$$($value$$) {
        $$dropdown$$.setValue($value$$);
      }
      function $__copyText$$($text$$) {
        $$dropdown$$.find(".dropdown-text").setHtml($text$$);
      }
      for (var $options$$ = $cfg$$.values, $$popout$$ = $js$$.dom('<ul class="dropdown-selection"></ul>'), $livalue_option$$ = null, $lihtml_litext$$ = $livalue_option$$ = "", $lihtml_litext$$ = "", $pause$$ = !0, $i$$ = 0;$i$$ < $options$$.length;) {
        $livalue_option$$ = $options$$[$i$$], $lihtml_litext$$ = $js$$.alg.string($livalue_option$$.text, $livalue_option$$.value), $livalue_option$$ = $js$$.alg.string($livalue_option$$.value, $livalue_option$$.text), $lihtml_litext$$ = ['<li class="item" value="', $livalue_option$$, '" title="', $lihtml_litext$$, '">', $lihtml_litext$$, "</li>"].join(""), $$popout$$.append($lihtml_litext$$), $i$$++;
      }
      $$popout$$.on("click", function __popoutClick($event$$) {
        $event$$.target.parentNode === this && $js$$.dom($event$$.target).getValue($__copyValue$$).getHtml($__copyText$$);
        $$DOC$$.trigger("click");
        $event$$.stopPropagation && $event$$.stopPropagation();
        $event$$.stopImmediatePropagation && $event$$.stopImmediatePropagation();
      }).attach($$dropdown$$);
      $$DOC$$.on("click", function docclick($event$$) {
        if ($pause$$) {
          return $pause$$ = !1;
        }
        $$popout$$ && $$popout$$.remove();
        $$dropdown$$ = $$popout$$ = null;
        $$DOC$$.off("click", docclick);
      });
    }
    function $setValue$$($data$$, $value$$) {
      $value$$ = $js$$.alg.string($value$$);
      var $self$$ = this;
      $js$$.alg.each($data$$.config.values, function($oTxt_option$$) {
        var $oVal$$ = $js$$.alg.string($oTxt_option$$.value, $oTxt_option$$.text);
        $oTxt_option$$ = $js$$.alg.string($oTxt_option$$.text, $oTxt_option$$.value);
        $value$$ === $oVal$$ && ($self$$.setValue($oVal$$).find(".dropdown-text").setHtml($oTxt_option$$), this.stop());
      });
    }
    var $$DOC$$ = $js$$.dom(document.documentElement);
    return function dropdown($cfg$$) {
      var $$dropdown$$2_cfgname_html$$ = $js$$.alg.string($cfg$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$.class, ""), $cfgvalue$$ = $js$$.alg.string($cfg$$.value, ""), $cfgdefault$$ = $js$$.alg.string($cfg$$.default, ""), $$dropdown$$2_cfgname_html$$ = ['<div name="', $$dropdown$$2_cfgname_html$$, '" tabindex="0"', $cfg$$.readonly ? ' readonly="true"' : "", ' class="input js-control js-control-dropdown ', $cfgclass$$, '"><i class="dropdown-arrow arrow-drop-down"></i><span class="dropdown-text">', 
      $cfgvalue$$ || $cfgdefault$$ || "&nbsp;", "</span></div>"].join(""), $$dropdown$$2_cfgname_html$$ = $js$$.dom($$dropdown$$2_cfgname_html$$);
      $$dropdown$$2_cfgname_html$$.on("click", $__dropdownClickFactory$$($cfg$$));
      $cfg$$.setValue = $setValue$$;
      return $$dropdown$$2_cfgname_html$$;
    };
  }).registerControlFn("textarea", function() {
    function $setValue$$($data$$, $v$$) {
      $v$$ = $js$$.alg.string($v$$, "");
      this.setValue($v$$);
    }
    return function($cfg$$) {
      var $cfgname$$1_html$$ = $js$$.alg.string($cfg$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$.class, ""), $cfgname$$1_html$$ = ['<textarea name="', $cfgname$$1_html$$, '"', $cfg$$.readonly ? ' readonly="true"' : "", ' class="input ', $cfgclass$$, '"></textarea>'].join("");
      $cfg$$.setValue = $setValue$$;
      return $js$$.dom($cfgname$$1_html$$);
    };
  }).registerControlFn("textarea-autosize", function() {
    function $setValue$$($data$$, $v$$) {
      $v$$ = $js$$.alg.string($v$$, "");
      this.setValue($v$$);
    }
    function $input$$($attrs$$13_css$$6_event$$) {
      $attrs$$13_css$$6_event$$ = {readonly:null};
      $js$$.dom(this).getAttrs($attrs$$13_css$$6_event$$);
      if (!$attrs$$13_css$$6_event$$.readonly) {
        div = document.createElement("div");
        $attrs$$13_css$$6_event$$ = {"font-family":null, "font-size":null, "font-weight":null, "padding-left":null, "padding-right":null, "padding-bottom":null, "padding-top":null, "border-left":null, "border-right":null, "border-top":null, "border-bottom":null, "line-height":null, "word-wrap":null};
        div.style.position = "fixed";
        div.style.left = "-65535px";
        div.style["white-space"] = "pre-wrap";
        div.style["white-space"] = "-moz-pre-wrap";
        div.style["white-space"] = "-pre-wrap";
        div.style["white-space"] = "-o-pre-wrap";
        div.style.width = div.style["min-width"] = div.style["max-width"] = this.clientWidth + "px";
        document.body.appendChild(div);
        var $textarea$$ = $js$$.dom(this).getCss($attrs$$13_css$$6_event$$);
        $js$$.dom(div).setText(this.value).setCss($attrs$$13_css$$6_event$$).getPosition(function($pos$$) {
          $textarea$$.setCss({height:$pos$$.height + 20 + "px"});
        }).remove();
      }
    }
    return function($cfg$$15_textarea$$) {
      var $cfgname$$2_html$$ = $js$$.alg.string($cfg$$15_textarea$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$15_textarea$$.class, ""), $cfgname$$2_html$$ = ['<textarea name="', $cfgname$$2_html$$, '" class="input js-control js-control-autosize ', $cfgclass$$, '"></textarea>'].join("");
      $cfg$$15_textarea$$.setValue = $setValue$$;
      $cfg$$15_textarea$$ = $js$$.dom($cfgname$$2_html$$);
      $cfg$$15_textarea$$.on("input", $input$$);
      return $cfg$$15_textarea$$;
    };
  }).registerControlFn("radio", function() {
    function $single$$($cfg$$16_html$$) {
      var $cfgtext$$ = $js$$.alg.string($cfg$$16_html$$.text, ""), $cfgvalue$$ = $js$$.alg.string($cfg$$16_html$$.value, ""), $cfgname$$ = $js$$.alg.string($cfg$$16_html$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$16_html$$.class, "");
      $cfg$$16_html$$ = ['<input value="', $cfgvalue$$, '" name="', $cfgname$$, '" type="radio"', $cfg$$16_html$$.readonly ? ' readonly="true"' : "", ' class="', $cfgclass$$, '"></input>'].join("");
      return $js$$.dom($cfg$$16_html$$).and($js$$.form.fn.buildLabel($cfgname$$, $cfgtext$$, $cfgclass$$));
    }
    function $exportValue$$($data$$) {
      return $data$$.config["data-value"] || null;
    }
    function $setValue$$($data$$, $values$$) {
      this.find("input[type=radio]").each(function($element$$) {
        var $props$$ = {checked:null}, $old$$ = null;
        $js$$.dom($element$$).getProps($props$$).getAttrs({value:""}, function($attrs$$) {
          $old$$ = $props$$.checked;
          $values$$ && $values$$.indexOf && ($props$$.checked = -1 < $values$$.indexOf($attrs$$.value));
        }).setProps($props$$).trigger($props$$.checked !== $old$$ ? "change" : "");
      });
      return this;
    }
    return function($cfg$$) {
      var $cfgname$$ = $js$$.alg.string($cfg$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$.class, ""), $options$$ = $cfg$$.values || [], $$option_option$$ = null, $$option_option$$ = null, $$radio$$ = $js$$.dom(), $i$$;
      $cfg$$["data-values"] = {};
      for ($i$$ = 0;$i$$ < $options$$.length;$i$$++) {
        $$option_option$$ = $js$$.alg.mergeObj({name:$cfgname$$, "class":$cfgclass$$, readonly:$cfg$$.readonly}, $options$$[$i$$]), $$option_option$$.class = $cfgclass$$ + $js$$.alg.string($options$$[$i$$].class), $$option_option$$ = $js$$.dom("<div></div>").append($single$$($$option_option$$)), $$radio$$.and($$option_option$$);
      }
      var $form$$ = this;
      $$radio$$.find("input").on("change", function($attrs$$16_event$$) {
        $attrs$$16_event$$ = {readonly:null};
        var $$me$$ = $js$$.dom(this);
        $$me$$.getAttrs($attrs$$16_event$$);
        $attrs$$16_event$$.readonly ? $form$$.setFieldValue($cfgname$$, $form$$.exportFieldValue($cfgname$$)) : $$me$$.getValue(function($v$$) {
          $cfg$$["data-value"] = $v$$;
        });
      });
      $cfg$$.exportValue = $exportValue$$;
      $cfg$$.setValue = $setValue$$;
      return $$radio$$;
    };
  }).registerControlFn("checkbox", function() {
    function $exportValue$$($data$$76_values$$) {
      var $keys$$ = [], $key$$;
      $data$$76_values$$ = $data$$76_values$$.config["data-values"] = $data$$76_values$$.config["data-values"] || {};
      for ($key$$ in $data$$76_values$$) {
        $data$$76_values$$[$key$$] && $keys$$.push($key$$.substring(4));
      }
      return $keys$$;
    }
    function $setValue$$($data$$, $values$$) {
      this.find("input[type=checkbox]").each(function($element$$) {
        var $props$$ = {checked:null}, $old$$ = null;
        $js$$.dom($element$$).getProps($props$$).getAttrs({value:""}, function($attrs$$) {
          $old$$ = $props$$.checked;
          $values$$ && $values$$.indexOf && ($props$$.checked = -1 < $values$$.indexOf($attrs$$.value));
        }).setProps($props$$).trigger($props$$.checked !== $old$$ ? "change" : "");
      });
      return this;
    }
    function $checkbox$$($cfg$$18_html$$) {
      var $cfgtext$$ = $js$$.alg.string($cfg$$18_html$$.text, ""), $cfgvalue$$ = $js$$.alg.string($cfg$$18_html$$.value, ""), $cfgname$$ = $js$$.alg.string($cfg$$18_html$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$18_html$$.class, "");
      $cfg$$18_html$$ = ['<input value="', $cfgvalue$$, '" name="', $cfgname$$, '" type="checkbox"', $cfg$$18_html$$.readonly ? ' readonly="true"' : "", ' class="', $cfgclass$$, '"></input>'].join("");
      return $js$$.dom($cfg$$18_html$$).and($js$$.form.fn.buildLabel($cfgname$$, $cfgtext$$, $cfgclass$$));
    }
    return function($cfg$$) {
      var $cfgname$$ = $js$$.alg.string($cfg$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$.class, ""), $options$$ = $cfg$$.values || [], $$option$$1_option$$ = null, $$option$$1_option$$ = null, $$checkbox$$ = $js$$.dom(), $i$$;
      $cfg$$["data-values"] = {};
      for ($i$$ = 0;$i$$ < $options$$.length;$i$$++) {
        $$option$$1_option$$ = $js$$.alg.mergeObj({name:$cfgname$$, readonly:$cfg$$.readonly}, $options$$[$i$$]), $$option$$1_option$$.class = $cfgclass$$ + $js$$.alg.string($options$$[$i$$].class), $$option$$1_option$$ = $js$$.dom("<div></div>").append($checkbox$$($$option$$1_option$$)), $$checkbox$$.and($$option$$1_option$$);
      }
      $$checkbox$$.find("input").on("change", function($event$$26_self$$) {
        var $checked$$ = this.checked;
        $event$$26_self$$ = $js$$.dom(this);
        var $attrs$$ = {readonly:null};
        $event$$26_self$$.getAttrs($attrs$$);
        $attrs$$.readonly ? this.checked = !$checked$$ : $event$$26_self$$.getValue(function($v$$) {
          $cfg$$["data-values"]["val-" + $js$$.alg.string($v$$)] = $checked$$;
        });
      });
      $cfg$$.exportValue = $exportValue$$;
      $cfg$$.setValue = $setValue$$;
      return $$checkbox$$;
    };
  }).registerControlFn("toggles", function() {
    function $exportValue$$($data$$) {
      var $keys$$ = [];
      this.filter(".js-buttonset").each(function($el$$) {
        $js$$.dom($el$$).getAttrs({"data-value":null, "data-checked":null}, function($attrs$$) {
          $attrs$$["data-checked"] && $keys$$.push($attrs$$["data-value"]);
        });
      });
      return $keys$$;
    }
    function $setValue$$($data$$, $values$$) {
      this.filter(".js-buttonset").each(function($element$$) {
        var $attrs$$0$$ = {"data-value":"", "data-checked":null}, $old$$ = null;
        $js$$.dom($element$$).getAttrs($attrs$$0$$, function($attrs$$) {
          $old$$ = $attrs$$["data-checked"];
          $values$$ && $values$$.indexOf && ($attrs$$["data-checked"] = -1 < $values$$.indexOf($attrs$$["data-value"]) ? !0 : null);
        }).setAttrs($attrs$$0$$).trigger($attrs$$0$$["data-checked"] !== $old$$ ? "change" : "");
      });
      return this;
    }
    function $checkbox$$($cfg$$) {
      var $cfgtext$$ = $js$$.alg.string($cfg$$.text, ""), $cfgvalue$$ = $js$$.alg.string($cfg$$.value, ""), $cfgclass$$ = $js$$.alg.string($cfg$$.class, "");
      return $js$$.form.fn.buildControl({type:"button", text:$cfgtext$$, class:$cfgclass$$ + " js-buttonset", readonly:$cfg$$.readonly, click:function($data$$, $event$$) {
        $js$$.dom(this).getAttrs({"data-checked":!1, readonly:!1}, function($attrs$$) {
          $attrs$$.readonly || ($attrs$$["data-checked"] = $js$$.alg.bool($attrs$$["data-checked"]) ? null : !0, this.setAttrs($attrs$$));
        });
      }}).setAttrs({"data-checked":null, "data-value":$cfgvalue$$});
    }
    return function($cfg$$) {
      var $cfgname$$ = $js$$.alg.string($cfg$$.name, ""), $cfgclass$$ = $js$$.alg.string($cfg$$.class, ""), $options$$ = $cfg$$.values || [], $$option$$2_option$$ = null, $$option$$2_option$$ = null, $$checkbox$$ = $js$$.dom(), $i$$;
      $cfg$$["data-values"] = {};
      for ($i$$ = 0;$i$$ < $options$$.length;$i$$++) {
        $$option$$2_option$$ = $js$$.alg.mergeObj({name:$cfgname$$, readonly:$cfg$$.readonly}, $options$$[$i$$]), $$option$$2_option$$.class = $cfgclass$$ + " " + $js$$.alg.string($options$$[$i$$].class), $$option$$2_option$$ = $js$$.dom($checkbox$$($$option$$2_option$$)), $$checkbox$$.and($$option$$2_option$$);
      }
      $cfg$$.exportValue = $exportValue$$;
      $cfg$$.setValue = $setValue$$;
      return $$checkbox$$;
    };
  }).registerControlFn("toggles-radio", function() {
    function $exportValue$$($data$$) {
      var $value$$ = null;
      this.filter(".js-buttonset[data-checked]").at(0).getAttrs({"data-value":null, "data-checked":null}, function($attrs$$) {
        $value$$ = $attrs$$["data-value"];
      });
      return $value$$;
    }
    function $setValue$$($data$$, $values$$) {
      this.filter('.js-buttonset[data-checked]:not([data-value="' + $values$$ + '"])').setAttrs({"data-checked":null}).trigger("change");
      this.filter('.js-buttonset[data-value="' + $values$$ + '"]:not([data-checked])').setAttrs({"data-checked":!0}).trigger("change");
      return this;
    }
    var $__override$$ = {type:"toggles", nolabel:!0};
    return function($cfg$$) {
      var $$checkbox$$3_tmp$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$), $$checkbox$$3_tmp$$ = this.buildControl($$checkbox$$3_tmp$$, !0), $form$$ = this;
      $$checkbox$$3_tmp$$.on("click", function($event$$) {
        var $self$$ = $js$$.dom(this);
        $js$$.alg.each($cfg$$.values, function($valObj$$) {
          $self$$.getAttrs({"data-value":null, readonly:null}, function($attrs$$) {
            $attrs$$.readonly || $form$$.setFieldValue($cfg$$.name, $attrs$$["data-value"]);
          });
        });
      });
      $cfg$$.exportValue = $exportValue$$;
      $cfg$$.setValue = $setValue$$;
      return $$checkbox$$3_tmp$$;
    };
  }).registerControlFn("toggles-bitwise", function() {
    function $exportValue$$($data$$) {
      var $values$$ = $js$$.alg.use(this, $__baseExportValue$$, arguments), $value$$ = 0;
      $js$$.alg.each($values$$, function($cbValue$$) {
        $value$$ |= $js$$.alg.number($cbValue$$);
      });
      return $value$$;
    }
    function $setValue$$($data$$, $values$$) {
      $values$$ = $js$$.alg.number($values$$, 0);
      this.filter(".js-buttonset").each(function($element$$) {
        var $attrs$$0$$ = {"data-value":"", "data-checked":null}, $old$$ = null;
        $js$$.dom($element$$).getAttrs($attrs$$0$$, function($attrs$$) {
          $old$$ = $attrs$$["data-checked"];
          $attrs$$["data-value"] = $js$$.alg.number($attrs$$["data-value"], 0);
          $attrs$$["data-checked"] = $values$$ === $attrs$$["data-value"] || $values$$ & $attrs$$["data-value"] ? !0 : null;
        }).setAttrs($attrs$$0$$).trigger($attrs$$0$$["data-checked"] !== $old$$ ? "change" : "");
      });
      return this;
    }
    var $__baseExportValue$$ = null, $__override$$ = {type:"toggles", nolabel:!0};
    return function($cfg$$) {
      var $tmp$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$), $$checkbox$$ = this.buildControl($tmp$$, !0);
      $cfg$$["data-values"] = $tmp$$["data-values"];
      $__baseExportValue$$ = $__baseExportValue$$ || $tmp$$.exportValue;
      $cfg$$.exportValue = $exportValue$$;
      $cfg$$.setValue = $setValue$$;
      return $$checkbox$$;
    };
  }).registerControlFn("checkbox-bitwise", function() {
    function $exportValue$$($data$$) {
      var $values$$ = $js$$.alg.use(this, $__baseExportValue$$, arguments), $value$$ = 0;
      $js$$.alg.each($values$$, function($cbValue$$) {
        $value$$ |= $js$$.alg.number($cbValue$$);
      });
      return $value$$;
    }
    function $setValue$$($data$$, $values$$) {
      $values$$ = $js$$.alg.number($values$$, 0);
      this.find("input[type=checkbox]").each(function($element$$) {
        var $props$$ = {checked:null}, $old$$ = null;
        $js$$.dom($element$$).getProps($props$$).getAttrs({value:""}, function($attrs$$) {
          $old$$ = $props$$.checked;
          $attrs$$.value = $js$$.alg.number($attrs$$.value, 0);
          $props$$.checked = $values$$ === $attrs$$.value || $values$$ & $attrs$$.value;
        }).setProps($props$$).trigger($props$$.checked !== $old$$ ? "change" : "");
      });
      return this;
    }
    var $__baseExportValue$$ = null, $__override$$ = {type:"checkbox", nolabel:!0};
    return function checkboxBitwise($cfg$$) {
      var $tmp$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$), $$checkbox$$ = this.buildControl($tmp$$, !0);
      $cfg$$["data-values"] = $tmp$$["data-values"];
      $__baseExportValue$$ = $__baseExportValue$$ || $tmp$$.exportValue;
      $cfg$$.exportValue = $exportValue$$;
      $cfg$$.setValue = $setValue$$;
      return $$checkbox$$;
    };
  }).registerControlFn("hidden", function() {
    var $__override$$ = {nolabel:!0, type:"input"}, $__css$$ = {display:"none"};
    return function hidden($cfg$$) {
      var $cfg2$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$), $ctl$$ = this.buildControl($cfg2$$, !0).setCss($__css$$);
      $cfg$$.setValue = $cfg2$$.setValue;
      return $ctl$$;
    };
  }).registerControlFn("autocomplete", function() {
    function $buildFunctions$$($form$$, $autocomplete$$, $config$$) {
      function $searchClick$$($event$$) {
        $js$$.dom(this).getAttrs({"data-value":null}, function($attrs$$) {
          $form$$.setFieldValue($config$$.name, $attrs$$["data-value"]);
        });
      }
      var $found$$ = $js$$.dom('<ul class="js-control js-autocomplete-search"></ul>');
      $autocomplete$$.on("keydown", function($event$$) {
        var $attrs$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$);
        if (!$attrs$$.readonly) {
          switch($attrs$$ = !1, $event$$.keyCode) {
            case $js$$.alg.keycodes.KC_UpArrow:
              $attrs$$ = !0;
            case $js$$.alg.keycodes.KC_DownArrow:
              var $selId$$ = -1;
              $found$$.find(".search-item").each(function($item$$, $i$$) {
                var $cls$$ = {selected:!1};
                $js$$.dom($item$$).getClasses($cls$$);
                $cls$$.selected && ($selId$$ = $i$$);
              });
              $found$$.find(".search-item").setClasses({selected:!1}).at($selId$$ + ($attrs$$ ? -1 : 1)).setClasses({selected:!0});
              break;
            case $js$$.alg.keycodes.KC_Tab:
            ;
            case $js$$.alg.keycodes.KC_Enter:
              $found$$.find(".search-item.selected").trigger("mousedown");
          }
        }
      }).on("blur", function($attrs$$32_event$$31_match$$) {
        $attrs$$32_event$$31_match$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$32_event$$31_match$$);
        $attrs$$32_event$$31_match$$.readonly || ("" === this.value ? $js$$.dom(this).setAttrs({"data-value":""}) : $config$$.strict && (($attrs$$32_event$$31_match$$ = $searchValue$$($config$$, this.value, !0)) ? (this.value = $attrs$$32_event$$31_match$$.text, $js$$.dom(this).setAttrs({"data-value":$attrs$$32_event$$31_match$$.value})) : (this.value = "", $js$$.dom(this).setAttrs({"data-value":""}))), $fns$$.hide());
      });
      var $fns$$ = {show:function search($css$$7_value$$) {
        var $values$$ = $config$$.values || [], $minlen$$ = $js$$.alg.number($config$$.minlen, 3), $data$$ = {match:[], regexp:new RegExp($js$$.alg.escapeString($css$$7_value$$), "i"), depth:$js$$.alg.number($config$$.length, 5)};
        $css$$7_value$$.length >= $minlen$$ ? ($js$$.alg.arrEach($values$$, $__searchLoop$$, $data$$), $css$$7_value$$ = {width:0}, this.getCss($css$$7_value$$), $found$$.setHtml($data$$.match.join("")).attachAfter(this).setCss($css$$7_value$$).find(".search-item").on("mousedown", $searchClick$$)) : $found$$.remove();
      }, hide:function() {
        $found$$.remove();
      }, getFirst:function() {
      }};
      return $fns$$;
    }
    function $__searchLoop$$($text$$22_valObj$$, $i$$44_value$$, $values$$, $data$$) {
      $i$$44_value$$ = $js$$.alg.string($text$$22_valObj$$.value);
      $text$$22_valObj$$ = $js$$.alg.string($text$$22_valObj$$.text, $i$$44_value$$);
      $data$$.regexp.test($text$$22_valObj$$) && $data$$.match.push('<li class="search-item" data-value="' + $i$$44_value$$ + '" title="' + $text$$22_valObj$$ + '">' + $text$$22_valObj$$ + "</li>");
      $data$$.match.length >= $data$$.depth && this.stop();
    }
    function $__searchValue$$($text$$23_valObj$$, $i$$45_value$$, $values$$, $data$$) {
      $i$$45_value$$ = $js$$.alg.string($text$$23_valObj$$.value);
      $text$$23_valObj$$ = $js$$.alg.string($text$$23_valObj$$.text, $i$$45_value$$);
      $data$$.find.test($data$$.searchText ? $text$$23_valObj$$ : $i$$45_value$$) && ($data$$.match = {value:$i$$45_value$$, text:$text$$23_valObj$$}, this.stop());
    }
    function $searchValue$$($config$$, $data$$90_value$$, $searchText$$) {
      $data$$90_value$$ = {match:null, find:new RegExp("^" + $data$$90_value$$ + "$"), searchText:$searchText$$};
      $js$$.alg.arrEach($config$$.values, $__searchValue$$, $data$$90_value$$);
      return $data$$90_value$$.match;
    }
    function $setValue$$($data$$, $value$$) {
      var $field$$ = $data$$.field, $strict$$ = $js$$.alg.bool($data$$.config.strict), $match$$3_text$$ = "", $attrs$$ = {};
      ($match$$3_text$$ = $searchValue$$($data$$.config, $value$$, !1)) ? ($attrs$$["data-value"] = $match$$3_text$$.value, $match$$3_text$$ = $match$$3_text$$.text) : $strict$$ ? $match$$3_text$$ = $attrs$$["data-value"] = "" : ($attrs$$["data-value"] = $js$$.alg.string($value$$, ""), $match$$3_text$$ = $js$$.alg.string($value$$, ""));
      $field$$.setAttrs($attrs$$).setValue($match$$3_text$$);
    }
    function $exportValue$$($data$$, $v$$) {
      var $value$$ = "";
      $data$$.field.getAttrs({"data-value":null}, function($attrs$$) {
        $value$$ = $attrs$$["data-value"];
      });
      $value$$ || $data$$.config.strict || $data$$.field.getProps({value:null}, function($props$$) {
        $value$$ = $props$$.value;
      });
      return $value$$;
    }
    var $__override$$ = {type:"input"};
    return function($cfg$$) {
      var $cfg2$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$), $$autocomplete$$ = this.buildControl($cfg2$$, !0), $search$$ = null;
      $cfg$$.setValue = $setValue$$;
      $cfg$$.exportValue = $exportValue$$;
      $search$$ = $buildFunctions$$(this, $$autocomplete$$, $cfg$$);
      $$autocomplete$$.on("focus input", function($attrs$$35_event$$) {
        $attrs$$35_event$$ = {readonly:null};
        $js$$.dom(this).getAttrs($attrs$$35_event$$);
        $attrs$$35_event$$.readonly || $$autocomplete$$.getValue($search$$.show);
      });
      return $$autocomplete$$;
    };
  }).registerControlFn("number", function() {
    function $setValue$$($data$$, $v$$) {
      $v$$ = $js$$.alg.string($v$$, "");
      $data$$.field.filter("input").getAttrs({"data-focus":!1}, function($attrs$$36_c$$) {
        if ($attrs$$36_c$$["data-focus"]) {
          $v$$ = $toNumber$$($v$$, $data$$.config.acc);
        } else {
          var $n$$inline_16_part$$ = $v$$;
          $attrs$$36_c$$ = $data$$.config.tsep;
          var $d$$ = $data$$.config.dec, $a$$inline_19_num$$ = $data$$.config.acc;
          "" === $js$$.alg.string($n$$inline_16_part$$, "") ? $v$$ = $n$$inline_16_part$$ : ($n$$inline_16_part$$ = $js$$.alg.number($n$$inline_16_part$$, 0), $attrs$$36_c$$ = $js$$.alg.string($attrs$$36_c$$, ","), $d$$ = $js$$.alg.string($d$$, "."), "undefined" !== typeof $a$$inline_19_num$$ && ($n$$inline_16_part$$ = $n$$inline_16_part$$.toFixed($a$$inline_19_num$$)), $n$$inline_16_part$$ = $js$$.alg.string($n$$inline_16_part$$, "").split("."), $a$$inline_19_num$$ = [], $a$$inline_19_num$$[0] = 
          ($n$$inline_16_part$$[0] || "").replace(/\B(?=(\d{3})+(?!\d))/g, $attrs$$36_c$$), $n$$inline_16_part$$[1] && $a$$inline_19_num$$.push($n$$inline_16_part$$[1]), $v$$ = $a$$inline_19_num$$.join($d$$));
        }
        this.setValue($v$$);
      });
    }
    function $exportValue$$($data$$, $v$$) {
      $v$$ = this.filter("input").exportValue();
      $v$$ = $v$$.replace(/([^\d\.])/g, "");
      return $toNumber$$($v$$);
    }
    function $toNumber$$($n$$, $a$$) {
      $n$$ = $js$$.alg.string($n$$, "");
      var $parts$$ = null;
      $n$$ = $n$$.replace(/([^\-\d\.]+)/g, "");
      ($parts$$ = $n$$.split(".")) ? ($parts$$[0] = $js$$.alg.number($parts$$[0], 0), $parts$$[1] = $js$$.alg.string($parts$$[1], "0"), $n$$ = $js$$.alg.number($parts$$[0] + "." + $parts$$[1], 0)) : $n$$ = 0;
      "undefined" !== typeof $a$$ && ($n$$ = $n$$.toFixed($a$$));
      return $n$$;
    }
    var $__override$$ = {type:"input"};
    return function number($cfg$$) {
      var $$input_cfg2$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$, {"class":$js$$.alg.string($cfg$$.class, "") + " data-number"}), $$input_cfg2$$ = this.buildControl($$input_cfg2$$, !0), $form$$ = this;
      $cfg$$.setValue = $setValue$$;
      $cfg$$.exportValue = $exportValue$$;
      $$input_cfg2$$.filter("input").on("blur", function($$input$$1_event$$) {
        $$input$$1_event$$ = $js$$.dom(this).setAttrs({"data-focus":null});
        $form$$.setFieldValue($cfg$$.name, $$input$$1_event$$.exportValue());
      }).on("focus", function($$input$$2_attrs$$37_event$$) {
        $$input$$2_attrs$$37_event$$ = {readonly:null};
        $js$$.dom(this).getAttrs($$input$$2_attrs$$37_event$$);
        $$input$$2_attrs$$37_event$$.readonly || ($$input$$2_attrs$$37_event$$ = $js$$.dom(this).setAttrs({"data-focus":!0}), $form$$.setFieldValue($cfg$$.name, $$input$$2_attrs$$37_event$$.exportValue()));
      });
      return $$input_cfg2$$;
    };
  }).registerControlFn("currency", function() {
    var $__override$$ = {type:"number"};
    return function currency($cfg$$) {
      var $cfg2$$ = $js$$.alg.mergeObj({}, $cfg$$, $__override$$, {"class":$js$$.alg.string($cfg$$.class, "") + " data-currency"}), $$input$$ = this.buildControl($cfg2$$, !0), $prefix$$ = '<div class="js-control js-control-currency-prefix">' + $js$$.alg.string($cfg$$.prefix, "$") + "</div>";
      Object.defineProperty($cfg$$, "acc", {get:function() {
        return $cfg2$$.acc;
      }, set:function($v$$) {
        $cfg2$$.acc = $v$$;
      }});
      $cfg$$.setValue = $cfg2$$.setValue;
      $cfg$$.exportValue = $cfg2$$.exportValue;
      $cfg$$.acc = $js$$.alg.number($cfg$$.acc, 2);
      return $js$$.dom($prefix$$).and($$input$$);
    };
  });
  return $js_form$$;
});
js.extend.fn("sp", function() {
  function $sp$$() {
  }
  function $__successPush$$($listItems$$, $successFn$$, $sender$$, $args$$) {
    for ($js$$.alg.use(this, $successFn$$, [$sender$$, $args$$, $listItems$$]);this._dirtyRows.pop();) {
    }
    this.pull();
  }
  function $__failurePush$$($listItems$$, $failureFn$$, $sender$$, $args$$) {
    $js$$.alg.use(this, $failureFn$$, [$sender$$, $args$$, $listItems$$]);
  }
  function $__successParse$$($itemEnumerator_listItems$$, $successFn$$, $sender$$, $args$$) {
    $itemEnumerator_listItems$$ = $itemEnumerator_listItems$$.getEnumerator();
    var $jsEach$$ = $js$$.alg.each, $columns$$ = this._columns, $currentItem_data$$ = null, $row$$ = $currentItem_data$$ = null;
    for (this.clearData();$itemEnumerator_listItems$$.moveNext();) {
      $row$$ = {}, $currentItem_data$$ = $itemEnumerator_listItems$$.get_current(), $currentItem_data$$ = {item:$currentItem_data$$, id:$currentItem_data$$.get_id(), _row:$row$$}, $jsEach$$($columns$$, $__pushRow$$, $currentItem_data$$), this._rows.push($row$$);
    }
    $successFn$$($sender$$, $args$$);
  }
  function $__pushRow$$($colData$$, $colName_rowID$$, $cell_columns$$, $data$$) {
    $colName_rowID$$ = $data$$.id;
    var $row$$ = $data$$._row, $dirty$$ = !1;
    $cell_columns$$ = Object.create($colData$$, {rowID:{value:$colName_rowID$$}, dirty:{get:function() {
      return $dirty$$;
    }}, value:{get:function() {
      return "function" === typeof this.macro ? this.macro($row$$) : $colValue$$;
    }, set:function($v$$) {
      $colData$$.internal && ($colValue$$ = $v$$, $dirty$$ = !0, 0 > $colData$$.list._dirtyRows.indexOf($row$$) && $colData$$.list._dirtyRows.push($row$$));
    }}});
    var $colValue$$ = $colData$$.default;
    if ($colData$$.internal) {
      try {
        $colValue$$ = $data$$.item.get_item($colData$$.internal), $colData$$.rowIDs[$colName_rowID$$] = $colValue$$, $colData$$.values[$colValue$$] || ($colData$$.values[$colValue$$] = []), $colData$$.values[$colValue$$].push($colName_rowID$$);
      } catch ($e$$) {
        $js$$.log.warn("Could not load data from column name " + $colData$$.internal);
      }
    }
    $colValue$$ = $__parseValueType$$($colData$$, $colValue$$);
    $row$$[$colData$$.name] = $cell_columns$$;
  }
  function $__parseValueType$$($colData$$, $value$$) {
    switch($colData$$.type) {
      case "bitflag":
      ;
      case "number":
        $value$$ = $js$$.alg.number($value$$);
        break;
      case "string":
      ;
      case "text":
        $value$$ = $js$$.alg.string($value$$);
    }
    return $value$$;
  }
  function $__failureParse$$($listItems$$, $failureFn$$, $sender$$, $args$$) {
    $failureFn$$($sender$$, $args$$);
  }
  function $__parseRows$$($row$$, $filterData_id$$, $_rows_f$$, $data$$) {
    if ($row$$ && $data$$ && $data$$.filterArray && $data$$.filterArray.length) {
      $filterData_id$$ = $data$$.filterArray;
      $data$$ = $data$$.exclude;
      var $filter$$, $drop$$, $value$$, $orDrop$$;
      $drop$$ = !1;
      for ($_rows_f$$ = 0;!$drop$$ && $_rows_f$$ < $filterData_id$$.length;$_rows_f$$++) {
        ($filter$$ = $filterData_id$$[$_rows_f$$]) && $filter$$.column && "undefined" !== typeof $row$$[$filter$$.column] && ($value$$ = $row$$[$filter$$.column].value, $orDrop$$ = !0, $drop$$ || "undefined" === typeof $filter$$.gt || ($filter$$.gt && "object" === typeof $filter$$.gt ? ($js$$.alg.each($filter$$.gt, function($or$$) {
          ($orDrop$$ = $orDrop$$ && !($value$$ > $or$$)) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = !($value$$ > $filter$$.gt)), $drop$$ || "undefined" === typeof $filter$$.geq || ($filter$$.geq && "object" === typeof $filter$$.geq ? ($js$$.alg.each($filter$$.geq, function($or$$) {
          ($orDrop$$ = $orDrop$$ && !($value$$ >= $or$$)) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = !($value$$ >= $filter$$.geq)), $drop$$ || "undefined" === typeof $filter$$.leq || ($filter$$.leq && "object" === typeof $filter$$.leq ? ($js$$.alg.each($filter$$.leq, function($or$$) {
          ($orDrop$$ = $orDrop$$ && !($value$$ <= $or$$)) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = !($value$$ <= $filter$$.leq)), $drop$$ || "undefined" === typeof $filter$$.lt || ($filter$$.lt && "object" === typeof $filter$$.lt ? ($js$$.alg.each($filter$$.lt, function($or$$) {
          ($orDrop$$ = $orDrop$$ && !($value$$ < $or$$)) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = !($value$$ < $filter$$.lt)), $drop$$ || "undefined" === typeof $filter$$.eq || ($filter$$.eq && "object" === typeof $filter$$.eq ? ($js$$.alg.each($filter$$.eq, function($or$$) {
          ($orDrop$$ = $orDrop$$ && $value$$ != $or$$) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = $value$$ != $filter$$.eq), $drop$$ || "undefined" === typeof $filter$$.seq || ($filter$$.seq && "object" === typeof $filter$$.seq ? ($js$$.alg.each($filter$$.seq, function($or$$) {
          ($orDrop$$ = $orDrop$$ && $value$$ !== $or$$) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = $value$$ !== $filter$$.seq), $drop$$ || "undefined" === typeof $filter$$.neq || ($filter$$.neq && "object" === typeof $filter$$.neq ? ($js$$.alg.each($filter$$.neq, function($or$$) {
          ($orDrop$$ = $orDrop$$ && $value$$ == $or$$) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = $value$$ == $filter$$.neq), $drop$$ || "undefined" === typeof $filter$$.snq || ($filter$$.snq && "object" === typeof $filter$$.snq ? ($js$$.alg.each($filter$$.snq, function($or$$) {
          ($orDrop$$ = $orDrop$$ && $value$$ === $or$$) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = $value$$ === $filter$$.snq), $drop$$ || "undefined" === typeof $filter$$.and || ($filter$$.and && "object" === typeof $filter$$.and ? ($js$$.alg.each($filter$$.and, function($or$$) {
          ($orDrop$$ = $orDrop$$ && ($value$$ & $or$$) !== $or$$) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = ($value$$ & $filter$$.and) !== $filter$$.and), $drop$$ || "undefined" === typeof $filter$$.not || ($filter$$.not && "object" === typeof $filter$$.not ? ($js$$.alg.each($filter$$.not, function($or$$) {
          ($orDrop$$ = $orDrop$$ && 0 !== ($value$$ & $or$$)) || this.stop();
        }), $drop$$ = $orDrop$$) : $drop$$ = 0 !== ($value$$ & $filter$$.not)), $drop$$ || "undefined" === typeof $filter$$.test || ($filter$$.test instanceof RegExp ? $drop$$ = !$filter$$.test.test($value$$) : $filter$$.test && "object" === typeof $filter$$.test && ($js$$.alg.each($filter$$.test, function($or$$) {
          ($orDrop$$ = $orDrop$$ && !$or$$.test($value$$)) || this.stop();
        }), $drop$$ = $orDrop$$)));
      }
      (!$data$$ && $drop$$ || $data$$ && !$drop$$) && this.drop();
      return this;
    }
  }
  function $__generateXML$$($name$$, $table$$, $rows$$, $columns$$0$$, $styles$$) {
    return ['<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>', ['<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><ss:Styles><ss:Style ss:ID="1"><ss:Font ss:Bold="1" /></ss:Style></ss:Styles>', ['<ss:Worksheet ss:Name="', $name$$, '"><ss:Table>', function __rows($rows$$, $columns$$) {
      function $__pushRow$$($col$$, $i$$, $cols$$, $data$$) {
        __rows.push(['<ss:Cell><ss:Data ss:Type="String">', $rows$$[$col$$][$data$$], "</ss:Data></ss:Cell>"].join(""));
      }
      var __rows = [];
      __rows.push('<ss:Row ss:StyleID="1">');
      $js$$.alg.arrEach($columns$$, $__pushRow$$, "text");
      __rows.push("</ss:Row>");
      $js$$.alg.arrEach($rows$$, function($row$$, $i$$) {
        __rows.push("<ss:Row>");
        $js$$.alg.arrEach($columns$$, $__pushRow$$, "value");
        __rows.push("</ss:Row>");
      });
      return __rows.join("");
    }($rows$$, $columns$$0$$), "</ss:Table></ss:Worksheet>"].join(""), "</ss:Workbook>"].join("")].join("");
  }
  function $__generateCSV$$($table$$0$$, $rows$$0$$, $columns$$0$$) {
    return ["\ufeff", function __headers($table$$, $columns$$) {
      var __headers = [];
      $js$$.alg.arrEach($columns$$, function($column$$) {
        __headers.push(['"', $table$$.getColumn($column$$).text || " ", '"'].join(""));
      });
      return __headers.join(",");
    }($table$$0$$, $columns$$0$$), "\r\n", function __rows$$0($rows$$, $columns$$) {
      function $__pushRow$$($col$$, $i$$, $cols$$, $data$$) {
        $data$$.row && $__oneRow$$.push(['"', ($data$$.row[$col$$] || {})[$data$$.type] || "", '"'].join(""));
      }
      var $__rows$$ = [], $__oneRow$$ = null;
      $js$$.alg.arrEach($rows$$, function($row$$, $i$$) {
        $__oneRow$$ = [];
        $js$$.alg.arrEach($columns$$, $__pushRow$$, {row:$row$$, type:"value", r:[]});
        $__rows$$.push($__oneRow$$.join(","));
      });
      return $__rows$$.join("\r\n");
    }($rows$$0$$, $columns$$0$$)].join("");
  }
  var $js$$ = window.jspyder;
  $sp$$.list = function spList($config$$, $fn$$) {
    window.SP || $js$$.log.warn("Ensure that MicrosoftAjax.js, sp.runtime.js, and sp.js have been loaded before using JSpyder SharePoint Interface");
    var $list$$ = Object.create($sp$$.list.fn);
    $config$$ && ($config$$.url && ($list$$._url = $config$$.url), $config$$.name && ($list$$._name = $config$$.name), "function" === typeof $config$$.success && ($list$$._success = $config$$.success), "function" === typeof $config$$.failure && ($list$$._failure = $config$$.failure), $config$$.caml && ($list$$._caml = $config$$.caml));
    $list$$._columns = {};
    $list$$._rows = [];
    $list$$._dirtyRows = [];
    $js$$.alg.use($list$$, $fn$$);
    return $list$$;
  };
  $sp$$.list.fn = {_url:"", _name:"", _success:function $$sp$$$list$fn$_success$() {
  }, _failure:function $$sp$$$list$fn$_failure$() {
  }, _caml:"<View><Query><Where><Geq><FieldRef Name='ID' /><Value Type='Number'>1</Value></Geq></Where></Query><RowLimit>10000</RowLimit></View>", _columns:{}, _rows:[], _dirtyRows:[], get length() {
    return this._rows.length;
  }, addColumn:function $$sp$$$list$fn$addColumn$($name$$, $data$$) {
    var $column$$ = Object.create($sp$$.column.fn, {list:{value:this}, name:{value:$name$$}});
    $js$$.alg.mergeObj($column$$, $data$$);
    "undefined" === typeof $data$$["default"] && "number" === $column$$.type && ($column$$["default"] = 0);
    this._columns[$name$$] = $column$$;
    return this;
  }, addColumns:function $$sp$$$list$fn$addColumns$($dataObj$$) {
    $js$$.alg.each($dataObj$$, function($data$$, $name$$, $dataObj$$, $list$$) {
      $list$$.addColumn($name$$, $data$$);
    }, this);
    return this;
  }, getColumn:function $$sp$$$list$fn$getColumn$($name$$) {
    return this._columns[$name$$] ? this._columns[$name$$] : Object.create($sp$$.column.fn, {list:{value:this}, name:{value:$name$$}});
  }, getRow:function $$sp$$$list$fn$getRow$($n$$) {
    return this._rows[$js$$.alg.number($n$$, 0)] || null;
  }, getRowById:function $$sp$$$list$fn$getRowById$($id$$) {
    for (var $found$$ = null, $row$$ = null, $i$$ = 0;$row$$ = this.getRow($i$$++);) {
      if ($row$$.ID.value === $id$$) {
        $found$$ = $row$$;
        break;
      }
    }
    return $found$$;
  }, eachDirtyRow:function $$sp$$$list$fn$eachDirtyRow$($fn$$, $data$$) {
    var $dirty$$ = this._dirtyRows;
    "function" === typeof $fn$$ && $js$$.alg.each($dirty$$, $fn$$, $data$$);
    return this;
  }, _createListItem:function $$sp$$$list$fn$_createListItem$() {
  }, getRowCount:function $$sp$$$list$fn$getRowCount$($n$$) {
    return this._rows.length;
  }, pull:function $$sp$$$list$fn$pull$($success$$, $failure$$) {
    var $ctx$$ = new window.SP.ClientContext(this._url), $list$$7_listItems$$ = $ctx$$.get_web().get_lists().getByTitle(this._name), $caml$$ = new window.SP.CamlQuery, $successFn$$ = "function" === typeof $success$$ ? $success$$ : this._success, $failureFn$$ = "function" === typeof $failure$$ ? $failure$$ : this._failure;
    $caml$$.set_viewXml(this.caml);
    $list$$7_listItems$$ = $list$$7_listItems$$.getItems($caml$$);
    $ctx$$.load($list$$7_listItems$$);
    $ctx$$.executeQueryAsync($js$$.alg.bindFn(this, $__successParse$$, [$list$$7_listItems$$, $successFn$$]), $js$$.alg.bindFn(this, $__failureParse$$, [$list$$7_listItems$$, $failureFn$$]));
    return this;
  }, query:function $$sp$$$list$fn$query$($criteria$$) {
    var $query$$ = $sp$$.query(this).reset();
    return $criteria$$ instanceof Array ? $query$$.filters($criteria$$) : $query$$.filter($criteria$$);
  }, clearData:function $$sp$$$list$fn$clearData$() {
    for (this._rows = [];this._dirtyRows.pop();) {
    }
    $js$$.alg.each(this._columns, function($colData$$) {
      $colData$$.rowIDs = {};
      $colData$$.values = {};
    });
    return this;
  }, push:function $$sp$$$list$fn$push$($success$$, $failure$$) {
    var $ctx$$ = new window.SP.ClientContext(this._url), $data$$103_list$$ = $ctx$$.get_web().get_lists().getByTitle(this._name), $data$$103_list$$ = {clientContext:$ctx$$, items:[], list:$data$$103_list$$, self:this};
    this.eachDirtyRow(this._pushLoopDirtyRows, $data$$103_list$$);
    $ctx$$.executeQueryAsync($js$$.alg.bindFn(this, $__successPush$$, [$data$$103_list$$.items, $success$$]), $js$$.alg.bindFn(this, $__failurePush$$, [$data$$103_list$$.items, $failure$$]));
    return this;
  }, _pushLoopDirtyRows:function $$sp$$$list$fn$_pushLoopDirtyRows$($row$$, $i$$51_rowID$$, $itemInfo_listItem_rows$$, $data$$) {
    $i$$51_rowID$$ = $row$$.ID.value;
    $itemInfo_listItem_rows$$ = $itemInfo_listItem_rows$$ = null;
    0 > $row$$.ID.value ? ($itemInfo_listItem_rows$$ = new SP.ListItemCreationInformation, $itemInfo_listItem_rows$$ = $data$$.list.addItem($itemInfo_listItem_rows$$), $data$$.newrow = !0) : ($itemInfo_listItem_rows$$ = $data$$.list.getItemById($i$$51_rowID$$), $data$$.newrow = !1);
    $data$$.listItem = $itemInfo_listItem_rows$$;
    $js$$.alg.each($row$$, $data$$.self._pushLoopDirtyRowColumns, $data$$);
    $data$$.items.push($itemInfo_listItem_rows$$);
    $itemInfo_listItem_rows$$.update();
    $data$$.clientContext.load($itemInfo_listItem_rows$$);
  }, _pushLoopDirtyRowColumns:function $$sp$$$list$fn$_pushLoopDirtyRowColumns$($coldata$$, $colname$$, $columns$$, $data$$) {
    $coldata$$.internal && $coldata$$.dirty && "ID" !== $coldata$$.internal && $data$$.listItem.set_item($coldata$$.internal, $coldata$$.value);
  }, updateRow:function $$sp$$$list$fn$updateRow$($id$$, $values$$) {
    var $row$$ = this.getRowById($id$$), $data$$ = $js$$.alg.mergeObj({}, $values$$);
    $row$$ && $js$$.alg.each($row$$, this._updateRowEach, $data$$);
    return this;
  }, _updateRowEach:function $$sp$$$list$fn$_updateRowEach$($colData$$, $colName$$1_value$$, $row$$, $data$$) {
    $colName$$1_value$$ = $data$$[$colData$$.name];
    $row$$ = $colName$$1_value$$ !== $colData$$.value;
    "undefined" !== typeof $colName$$1_value$$ && $row$$ && ($colData$$.value = $colName$$1_value$$);
  }, createRow:function $$sp$$$list$fn$createRow$($data$$108_values$$) {
    var $columns$$ = this._columns;
    $data$$108_values$$ = {row:{}, rowID:-1, values:$js$$.alg.mergeObj({}, $data$$108_values$$)};
    $js$$.alg.each($columns$$, this._createRowEach, $data$$108_values$$);
    $data$$108_values$$.row.ID.value = $data$$108_values$$.rowID;
    this._dirtyRows.push($data$$108_values$$.row);
    return this;
  }, _createRowEach:function $$sp$$$list$fn$_createRowEach$($colData$$, $colName$$2_value$$, $column$$, $cell$$1_data$$) {
    var $row$$ = $cell$$1_data$$.row;
    $colName$$2_value$$ = $cell$$1_data$$.values[$colData$$.name];
    $cell$$1_data$$ = Object.create($colData$$, {rowID:{value:$cell$$1_data$$.rowID}, dirty:{get:function() {
      return null !== $colValue$$;
    }}, value:{get:function() {
      return "function" === typeof this.macro ? this.macro($row$$) : $colValue$$;
    }, set:function($v$$) {
      $colData$$.internal && ($colValue$$ = $v$$);
    }}});
    var $colValue$$ = "undefined" !== typeof $colName$$2_value$$ ? $colName$$2_value$$ : $colData$$.default || null;
    $row$$[$colData$$.name] = $cell$$1_data$$;
  }, getPermissions:function $$sp$$$list$fn$getPermissions$($success$$, $failure$$) {
    var $ctx$$ = new window.SP.ClientContext(this._url), $web$$ = $ctx$$.get_web(), $data$$ = {currentUser:$web$$.get_currentUser(), web:$web$$};
    $ctx$$.load($data$$.currentUser);
    $ctx$$.load($web$$, "EffectiveBasePermissions");
    $ctx$$.executeQueryAsync($js$$.alg.bindFn(this, this._getPermissionsSuccess, [$data$$, $success$$]), $js$$.alg.bindFn(this, this._getPermissionsSuccess, [null, $failure$$]));
    return this;
  }, _getPermissionsSuccess:function $$sp$$$list$fn$_getPermissionsSuccess$($data$$, $callback$$, $sender$$, $args$$) {
    var $permissions$$ = this._permissions = {};
    if ($data$$) {
      var $perm$$ = $data$$.web.get_effectiveBasePermissions();
      $js$$.alg.each(new window.SP.PermissionKind, function($pValue$$, $pName$$) {
        $permissions$$[$pName$$] = $js$$.alg.bool($perm$$.has($pValue$$));
      });
      $js$$.alg.use(this, $callback$$, [this._permissions]);
    } else {
      $js$$.alg.use(this, $callback$$, [$sender$$, $args$$]);
    }
  }};
  $sp$$.query = function $$sp$$$query$($list$$) {
    return Object.create($sp$$.query.fn, {_list:{value:$list$$}});
  };
  $sp$$.query.fn = {_list:null, _rows:null, get length() {
    return this._rows.length;
  }, row:function $$sp$$$query$fn$row$($n$$) {
    return this._rows[$js$$.alg.number($n$$)];
  }, reset:function $$sp$$$query$fn$reset$() {
    this._rows = this._list._rows.slice(0);
    return this;
  }, filter:function $$sp$$$query$fn$filter$($filterData$$) {
    $filterData$$ && $js$$.alg.arrEach(this._rows, $__parseRows$$, {filterArray:[$filterData$$], exclude:!1});
    return this;
  }, filters:function $$sp$$$query$fn$filters$($filterArray$$) {
    $js$$.alg.arrEach(this._rows, $__parseRows$$, {filterArray:$filterArray$$, exclude:!1});
    return this;
  }, excludes:function $$sp$$$query$fn$excludes$($filterArray$$) {
    $js$$.alg.arrEach(this._rows, $__parseRows$$, {filterArray:$filterArray$$, exclude:!0});
    return this;
  }, _cleanRows:function $$sp$$$query$fn$_cleanRows$() {
    this._rows.sort();
    var $index$$ = this._rows.indexOf(null);
    -1 < $index$$ && this._rows.splice($index$$);
    return this;
  }, data:function $$sp$$$query$fn$data$($fn$$) {
    $js$$.alg.use(this, $fn$$, [this._rows]);
    return this;
  }, sort:function $$sp$$$query$fn$sort$($field$$, $asc$$) {
    $js$$.alg.sortArrayObj(this._rows, $asc$$, $field$$, "value");
    return this;
  }, each:function $$sp$$$query$fn$each$($fn$$) {
    $js$$.alg.arrEach(this._rows, $fn$$, this);
    return this;
  }, sum:function $$sp$$$query$fn$sum$($columns$$, $fn$$) {
    this.data(function($rows$$) {
      $js$$.alg.each($columns$$, $sp$$.query.fn._sum).alg.each($rows$$, $sp$$.query.fn._sumRows, $columns$$).alg.use(this, $fn$$, [$columns$$]);
    });
    return this;
  }, _sum:function $$sp$$$query$fn$_sum$($column$$, $key$$, $columns$$) {
    $columns$$[$key$$] = $column$$.value || $column$$.default;
  }, _sumRows:function $$sp$$$query$fn$_sumRows$($row$$, $_$$, $rows$$, $columns$$) {
    $js$$.alg.each($row$$, $sp$$.query.fn._sumColumns, $columns$$);
  }, _sumColumns:function $$sp$$$query$fn$_sumColumns$($value$$, $colName$$, $_$$, $out$$) {
    switch($value$$.type) {
      case "number":
        $out$$[$colName$$] = $js$$.alg.number($out$$[$colName$$]) + $js$$.alg.number($value$$.value);
        break;
      default:
        $out$$[$colName$$] = $value$$.value;
    }
  }, getValues:function $$sp$$$query$fn$getValues$($columns$$0$$, $fn$$) {
    function $__copyColumn$$($arr$$, $key$$, $columns$$, $row$$) {
      $arr$$[$row$$[$key$$].value] = !0;
    }
    $js$$.alg.each($columns$$0$$, function($v$$, $k$$, $columns$$) {
      $columns$$[$k$$] = {};
    });
    this.each(function($row$$) {
      $js$$.alg.each($columns$$0$$, $__copyColumn$$, $row$$);
    });
    $js$$.alg.each($columns$$0$$, function($obj$$, $k$$, $columns$$) {
      $columns$$[$k$$] = Object.keys($obj$$).sort();
    });
    $js$$.alg.use(this, $fn$$, [$columns$$0$$]);
    return this;
  }, clone:function $$sp$$$query$fn$clone$() {
    var $clone$$ = $sp$$.query(this._list);
    $clone$$._rows = this._rows.slice(0);
    return $clone$$;
  }, toExcelString:function $$sp$$$query$fn$toExcelString$($name$$, $columns$$) {
    return $__generateXML$$($name$$, this._list, this._rows, $columns$$);
  }, toCsvString:function $$sp$$$query$fn$toCsvString$($columns$$) {
    return $__generateCSV$$(this._list, this._rows, $columns$$);
  }};
  $sp$$.column = function $$sp$$$column$() {
  };
  $sp$$.column.fn = {internal:"", text:"", type:"string", default:"", valueOf:function $$sp$$$column$fn$valueOf$() {
    return this.value;
  }};
  return $sp$$;
});
jspyder.extend.fn("template", function() {
  function $js_template$$($data$$) {
    $data$$ && "object" === typeof $data$$ || ($data$$ = {});
    var $compiled$$ = "";
    return Object.create($js_template$$.fn, {_data:{get:function() {
      return $data$$;
    }}, _compiled:{get:function() {
      return $compiled$$;
    }}, _setData:{value:function _setData($key$$, $d$$) {
      $key$$ === $__master_key$$ && ($data$$ = $d$$);
    }}, _setCompiled:{value:function _setCompiled($key$$, $c$$) {
      $key$$ === $__master_key$$ && ($compiled$$ = $c$$);
    }}});
  }
  function $__parse$$($tmp$$, $data$$) {
    for (var $ctx$$ = {data:$data$$, tmp:$tmp$$, lib:$_library$$}, $found$$2_name$$inline_36_tmp$$ = null, $str$$ = "", $ctx$$inline_26_index$$54_value$$ = 0, $args$$inline_28_length$$;$found$$2_name$$inline_36_tmp$$ = $reSymbol$$.exec($ctx$$.tmp);) {
      $ctx$$inline_26_index$$54_value$$ = $found$$2_name$$inline_36_tmp$$.index;
      $found$$2_name$$inline_36_tmp$$ = $found$$2_name$$inline_36_tmp$$[0];
      $args$$inline_28_length$$ = $found$$2_name$$inline_36_tmp$$.length;
      $str$$ += $ctx$$.tmp.substring(0, $ctx$$inline_26_index$$54_value$$);
      $ctx$$.tmp = $ctx$$.tmp.substring($ctx$$inline_26_index$$54_value$$ + $args$$inline_28_length$$);
      if ($reFunction$$.test($found$$2_name$$inline_36_tmp$$)) {
        var $ctx$$inline_26_index$$54_value$$ = $ctx$$, $name$$inline_27_result$$ = void 0;
        $args$$inline_28_length$$ = [];
        for (var $arg$$inline_29_fn$$ = void 0, $len$$ = $name$$inline_27_result$$ = void 0, $cut$$ = void 0, $name$$inline_27_result$$ = $found$$2_name$$inline_36_tmp$$.match($reFuncName$$)[0].substring(1), $found$$2_name$$inline_36_tmp$$ = $found$$2_name$$inline_36_tmp$$.substring($found$$2_name$$inline_36_tmp$$.indexOf("(") + 1, $found$$2_name$$inline_36_tmp$$.lastIndexOf(")"));$arg$$inline_29_fn$$ = $reFuncArgs$$.exec($found$$2_name$$inline_36_tmp$$);) {
          $cut$$ = $arg$$inline_29_fn$$[0].length, $len$$ = $arg$$inline_29_fn$$.length, $arg$$inline_29_fn$$ = $arg$$inline_29_fn$$[$len$$ - 1], $found$$2_name$$inline_36_tmp$$ = $found$$2_name$$inline_36_tmp$$.substring($cut$$), $arg$$inline_29_fn$$.search($reFunction$$) ? $arg$$inline_29_fn$$.search($reCommandLiteral$$) ? $arg$$inline_29_fn$$.search($reString$$) ? $arg$$inline_29_fn$$.search($reVariable$$) ? $arg$$inline_29_fn$$.search($reNumber$$) ? $args$$inline_28_length$$.push($__parse$$($arg$$inline_29_fn$$, 
          $ctx$$inline_26_index$$54_value$$.data)) : $args$$inline_28_length$$.push(+$arg$$inline_29_fn$$) : $args$$inline_28_length$$.push($__parse$$($arg$$inline_29_fn$$, $ctx$$inline_26_index$$54_value$$.data)) : $args$$inline_28_length$$.push($arg$$inline_29_fn$$.substring(1, $arg$$inline_29_fn$$.length - 1)) : $args$$inline_28_length$$.push($__parse$$($arg$$inline_29_fn$$.substring(1, $arg$$inline_29_fn$$.length - 1), $ctx$$inline_26_index$$54_value$$.data)) : $args$$inline_28_length$$.push($__parse$$($arg$$inline_29_fn$$, 
          $ctx$$inline_26_index$$54_value$$.data));
        }
        ($arg$$inline_29_fn$$ = $ctx$$inline_26_index$$54_value$$.lib.fetch($name$$inline_27_result$$)) ? ($name$$inline_27_result$$ = $arg$$inline_29_fn$$.apply($ctx$$inline_26_index$$54_value$$.data, $args$$inline_28_length$$), "undefined" !== typeof $name$$inline_27_result$$ && null !== $name$$inline_27_result$$ && ($found$$2_name$$inline_36_tmp$$ = $name$$inline_27_result$$)) : $found$$2_name$$inline_36_tmp$$ = "@" + $name$$inline_27_result$$ + "(" + $args$$inline_28_length$$.join(", ") + ")";
      }
      $reVariable$$.test($found$$2_name$$inline_36_tmp$$) && ($ctx$$inline_26_index$$54_value$$ = $ctx$$.data[$found$$2_name$$inline_36_tmp$$.substring(2, $found$$2_name$$inline_36_tmp$$.length - 1)], $found$$2_name$$inline_36_tmp$$ = "undefined" === typeof $ctx$$inline_26_index$$54_value$$ ? $found$$2_name$$inline_36_tmp$$ : null !== $ctx$$inline_26_index$$54_value$$ ? $ctx$$inline_26_index$$54_value$$ : "");
      $str$$ += $found$$2_name$$inline_36_tmp$$;
    }
    return $str$$ += $ctx$$.tmp;
  }
  var $js$$ = this;
  if (!$js$$) {
    return console.error("Attempted to load module js-template without loading JSpyder"), null;
  }
  var $_templates$$ = $js$$.createRegistry(), $_library$$ = $js$$.createRegistry(), $__master_key$$ = (4294967295 * Math.random() | 0).toString(32), $reFuncArgs$$ = /\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|\d+(?:\.\d+)?|\$\{\D[a-z0-9_]*\})(?:\s*,\s*(?!\)))?/i, $reString$$ = /"(?:[^"\\]|\\.)*"/i, $reCommandLiteral$$ = /`(?:[^`\\]|\\.)*`/i, $reNumber$$ = /\d+(?:\.\d+)?/, $reVariable$$ = /\$\{\D[a-z0-9_]*\}/i, $reFuncName$$ = /\@\D[a-z0-9_]*/i, $reFunction$$ = /\@\D[a-z0-9_]*\((?:\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|\d+(?:\.\d+)?|\$\{\D[a-z0-9_]*\})(?:\s*,\s*(?!\)))?)*\)/i, 
  $reSymbol$$ = /(\@\D[a-z0-9_]*\((?:\s*(`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|\d+(?:\.\d+)?|\$\{\D[a-z0-9_]*\})(?:\s*,\s*(?!\)))?)*\)|\$\{\D[a-z0-9_]*\})/i;
  $js_template$$.fn = {compile:function $$js_template$$$fn$compile$($name$$107_template$$, $data$$, $fn$$) {
    $name$$107_template$$ = $_templates$$.fetch($name$$107_template$$);
    return this.compileExplicit($name$$107_template$$, $data$$, $fn$$);
  }, compileExplicit:function $$js_template$$$fn$compileExplicit$($template$$4_tmp$$, $data$$, $fn$$) {
    "function" !== typeof $data$$ || $fn$$ || ($fn$$ = $data$$, $data$$ = null);
    "undefined" === typeof $template$$4_tmp$$ && ($template$$4_tmp$$ = "");
    var $o$$0$$ = Object.create(this._data);
    $js$$.alg.each($data$$ || {}, function($v$$, $k$$, $_$$, $o$$) {
      $o$$[$k$$] = $v$$;
    }, $o$$0$$);
    $template$$4_tmp$$ = $__parse$$($template$$4_tmp$$, $o$$0$$);
    this._setCompiled($__master_key$$, $template$$4_tmp$$);
    "function" === typeof $fn$$ && $fn$$.apply(this, [$template$$4_tmp$$]);
    return this;
  }, output:function $$js_template$$$fn$output$() {
    return this._compiled;
  }, storeTemplate:function $$js_template$$$fn$storeTemplate$($name$$, $template$$) {
    $template$$ = $js$$.alg.string($template$$, "");
    $template$$ = $template$$.replace(/\<\!\-\-[^\<]+\-\-\>/g, "").replace(/\<([^\s\>]+)([^\>]+)\/\>/i, "<$1 $2></$1>");
    $_templates$$.stash($name$$, $template$$);
    return this;
  }, storeTemplateXml:function $$js_template$$$fn$storeTemplateXml$($filename$$, $fn$$) {
    $filename$$ = $js$$.alg.string($filename$$);
    if ($js$$.ajax) {
      var $data$$ = {xmls:new XMLSerializer, fn:$fn$$};
      $js$$.ajax($filename$$).get($js_template$$.fn._storeTemplateXml_ajax, $data$$);
    } else {
      $js$$.log.error("Attempted to call jspyder.template.storeTemplateXml() without loading jspyder.ajax module!");
    }
    return this;
  }, _storeTemplateXml_ajax:function $$js_template$$$fn$_storeTemplateXml_ajax$($xhttp$$, $data$$) {
    $js$$.dom($xhttp$$.responseXML.firstChild).children($js_template$$.fn._storeTemplateXml_children, $data$$);
    $js$$.alg.run($data$$.fn);
  }, _storeTemplateXml_children:function $$js_template$$$fn$_storeTemplateXml_children$($child$$, $data$$) {
    $js_template$$.fn.storeTemplate($child$$.getAttribute("name"), $data$$.xmls.serializeToString($child$$).replace(/\<[\/]?template[^\>]*\>/g, ""));
  }, getTemplate:function $$js_template$$$fn$getTemplate$($name$$, $fn$$) {
    $_templates$$.fetch($name$$, $fn$$);
    return this;
  }, register:function $$js_template$$$fn$register$($name$$, $fn$$) {
    "function" === typeof $fn$$ && $_library$$.stash($name$$, $fn$$);
    return this;
  }, registerSet:function $$js_template$$$fn$registerSet$($o$$) {
    var $self$$ = this;
    $js$$.alg.each($o$$, function($v$$, $k$$) {
      $self$$.register($k$$, $v$$);
    });
    return this;
  }};
  $js_template$$.storeTemplate = $js_template$$.fn.storeTempate;
  $js_template$$.storeTemplateXml = $js_template$$.fn.storeTemplateXml;
  $js_template$$.getTemplate = $js_template$$.fn.getTemplate;
  $js_template$$.compile = $js_template$$.fn.compile;
  $js_template$$.compileExplicit = $js_template$$.fn.compileExplicit;
  $js_template$$.register = $js_template$$.fn.register;
  $js_template$$.registerSet = $js_template$$.fn.registerSet;
  $js_template$$.registerSet({each:function($data$$0$$, $push$$, $template$$) {
    $data$$0$$ = this[$data$$0$$] || {};
    var $pushObj$$ = Object.create(this), $ret$$ = "", $$t$$ = $js_template$$($data$$0$$);
    $js$$.alg.each($data$$0$$, function($v$$, $k$$, $data$$, $ctx$$) {
      $pushObj$$[$push$$] = $v$$;
      $ret$$ += $$t$$.compileExplicit($template$$, $pushObj$$).output();
    }, this);
    return $ret$$;
  }, insert_template:function($name$$) {
    for (var $tmp$$ = "", $o$$ = Object.create(this), $i$$ = 1;$i$$ < arguments.length;++$i$$) {
      $o$$[arguments[$i$$]] = $o$$[arguments[++$i$$]];
    }
    $o$$.arguments = $js$$.alg.sliceArray(arguments, 1);
    $js_template$$($o$$).compile($name$$, function($v$$) {
      $tmp$$ = $v$$;
    });
    return $tmp$$;
  }, arguments:function($n$$) {
    $n$$ = $js$$.alg.number($n$$);
    return this.arguments ? this.arguments[$n$$] || "" : "";
  }, iif:function($test$$, $pass$$, $fail$$) {
    var $$t$$ = $js_template$$(this);
    "string" === typeof $test$$ && ($test$$ = $$t$$.compileExplicit($test$$).output());
    return $test$$ ? $$t$$.compileExplicit($pass$$).output() : $$t$$.compileExplicit($fail$$).output();
  }, map_size:function($arrayName_data$$) {
    return ($arrayName_data$$ = this[$arrayName_data$$]) && $arrayName_data$$.length ? $arrayName_data$$.length : "undefined" === typeof $arrayName_data$$ ? 0 : 1;
  }, add:function($n$$, $a$$) {
    return $js$$.alg.number($js$$.alg.number($n$$) + $js$$.alg.number($a$$));
  }, "var":function($name$$, $value$$) {
    if (1 === arguments.length) {
      return this[$name$$] || "";
    }
    this[$name$$] = $value$$;
    return "";
  }, map:function($name$$) {
    for (var $map$$ = {}, $i$$ = 1;$i$$ < arguments.length;$i$$ += 2) {
      $map$$[arguments[$i$$]] = arguments[$i$$ + 1];
    }
    this[$name$$] = $map$$;
    return "";
  }, map_item:function($map$$, $id$$) {
    return ($map$$ = this[$map$$]) ? $map$$[$id$$] : $id$$;
  }, js_registry:function($data$$122_key$$) {
    $data$$122_key$$ = $js$$.registry.fetch($data$$122_key$$);
    return null === $data$$122_key$$ || "undefined" === typeof $data$$122_key$$ ? "" : $data$$122_key$$;
  }, js_log:function($data$$) {
    console.log($data$$);
  }, concat:function($str$$) {
    for (var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
      $str$$ += arguments[$i$$];
    }
    return $str$$;
  }, html:function($str$$) {
    $js$$.dom("<div>" + $str$$ + "</div>").getText(function($v$$) {
      $str$$ = $v$$;
    });
    return $str$$;
  }, escape:function($str$$0$$) {
    var $ret$$ = [];
    $str$$0$$ = $str$$0$$.split(/\r?\n/);
    $js$$.alg.arrEach($str$$0$$, function($str$$) {
      var $t$$ = [];
      $js$$.alg.iterate(0, $str$$.length, function($i$$) {
        $t$$.push("&#", $str$$.charCodeAt($i$$), ";");
      });
      $ret$$.push($t$$.join(""));
    });
    return $ret$$.join("<br />");
  }, tag:function($tag$$, $props$$) {
    $tag$$ = $js$$.alg.string($tag$$, "br");
    $props$$ = $js$$.alg.string($props$$, "");
    var $voidElement$$ = /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)\b/i.test($tag$$);
    return "<" + $tag$$ + " " + $props$$ + ($voidElement$$ ? " /" : "></" + $tag$$) + ">";
  }});
  return $js$$.template = $js_template$$;
});

