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
$jscomp.inherits = function $$jscomp$inherits$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$;
  for (var $p$$ in $parentCtor$$) {
    if ($jscomp.global.Object.defineProperties) {
      var $descriptor$$ = $jscomp.global.Object.getOwnPropertyDescriptor($parentCtor$$, $p$$);
      $descriptor$$ && $jscomp.global.Object.defineProperty($childCtor$$, $p$$, $descriptor$$);
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
$jscomp.Map.prototype.delete = function $$jscomp$Map$$delete$($id$$5_key$$) {
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
    $$jscomp$key$z_$jscomp$restIndex$$ = $$jscomp$key$z_$jscomp$restIndex$$.value, $$jscomp$key$z_$jscomp$restIndex$$ = Number($$jscomp$key$z_$jscomp$restIndex$$), $max_sum$13$$ += $$jscomp$key$z_$jscomp$restIndex$$ * $$jscomp$key$z_$jscomp$restIndex$$;
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
    if ($$jscomp$key$source_$jscomp$restIndex$$2_source$$ = $$jscomp$key$source_$jscomp$restIndex$$2_source$$.value) {
      for (var $key$$ in $$jscomp$key$source_$jscomp$restIndex$$2_source$$) {
        Object.prototype.hasOwnProperty.call($$jscomp$key$source_$jscomp$restIndex$$2_source$$, $key$$) && ($target$$[$key$$] = $$jscomp$key$source_$jscomp$restIndex$$2_source$$[$key$$]);
      }
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
$jscomp.Set.prototype.delete = function $$jscomp$Set$$delete$($result$$2_value$$) {
  $result$$2_value$$ = this.map_.delete($result$$2_value$$);
  this.size = this.map_.size;
  return $result$$2_value$$;
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
var module$Environment$BrowserData = {}, BROWSER_IE$$module$Environment$BrowserData = "IE", BROWSER_EDGE$$module$Environment$BrowserData = "Edge", BROWSER_FIREFOX$$module$Environment$BrowserData = "Firefox", BROWSER_OPERA$$module$Environment$BrowserData = "Opera", BROWSER_OPERA_MINI$$module$Environment$BrowserData = "Opera Mini", BROWSER_SAFARI$$module$Environment$BrowserData = "Safari", BROWSER_SAFARI_IOS$$module$Environment$BrowserData = "iOS Safari", BROWSER_CHROME$$module$Environment$BrowserData = 
"Chrome", BROWSER_CHROME_ANDROID$$module$Environment$BrowserData = "Chrome for Android", BROWSER_ANDROID$$module$Environment$BrowserData = "Android BrowserData", BROWSER_UNKNOWN$$module$Environment$BrowserData = "Unknown BrowserData", BrowserData$$module$Environment$BrowserData = function $BrowserData$$module$Environment$BrowserData$() {
};
BrowserData$$module$Environment$BrowserData.BrowserName = function $BrowserData$$module$Environment$BrowserData$BrowserName$() {
  return window.MSInputMethodContext ? BROWSER_EDGE$$module$Environment$BrowserData : window.eval("/*@cc_on!@*/false") || window.document.documentMode ? BROWSER_IE$$module$Environment$BrowserData : "undefined" !== typeof window.InstallTrigger ? BROWSER_FIREFOX$$module$Environment$BrowserData : window.opera || 0 <= window.navigator.userAgent.indexOf(" OPR/") ? BROWSER_OPERA$$module$Environment$BrowserData : window.operamini ? BROWSER_OPERA_MINI$$module$Environment$BrowserData : window.chrome ? BROWSER_CHROME$$module$Environment$BrowserData : 
  /Android.*Chrome/.test(window.navigator.userAgent) ? BROWSER_CHROME_ANDROID$$module$Environment$BrowserData : /Android.*Mozilla\/5.0.*AppleWebKit/.test(window.navigator.userAgent) ? BROWSER_ANDROID$$module$Environment$BrowserData : 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") ? BROWSER_SAFARI$$module$Environment$BrowserData : /iP(ad|hone|od)/.test(window.navigator.userAgent) ? BROWSER_SAFARI_IOS$$module$Environment$BrowserData : BROWSER_UNKNOWN$$module$Environment$BrowserData;
};
BrowserData$$module$Environment$BrowserData.BrowserVersion = function $BrowserData$$module$Environment$BrowserData$BrowserVersion$($name$$) {
  $name$$ = void 0 === $name$$ ? BrowserData$$module$Environment$BrowserData.BrowserName() : $name$$;
  switch($name$$) {
    case BROWSER_ANDROID$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.AndroidVersion();
    case BROWSER_CHROME$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.ChromeVersion();
    case BROWSER_CHROME_ANDROID$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.AndroidChromeVersion();
    case BROWSER_EDGE$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.EdgeVersion();
    case BROWSER_FIREFOX$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.FirefoxVersion();
    case BROWSER_IE$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.IeVersion();
    case BROWSER_OPERA$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.OperaVersion();
    case BROWSER_OPERA_MINI$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.OperaMiniVersion();
    case BROWSER_SAFARI$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.SafariVersion();
    case BROWSER_SAFARI_IOS$$module$Environment$BrowserData:
      return BrowserData$$module$Environment$BrowserData.SafariIosVersion();
    default:
      return 0;
  }
};
BrowserData$$module$Environment$BrowserData.IeVersion = function $BrowserData$$module$Environment$BrowserData$IeVersion$() {
  return window.attachEvent ? window.eval("/*@cc_on (document.documentMode == 10)!=@*/false") ? 10 : window.requestAnimationFrame ? 9 : window.addEventListener ? 7 : 8 : 11;
};
BrowserData$$module$Environment$BrowserData.FirefoxVersion = function $BrowserData$$module$Environment$BrowserData$FirefoxVersion$() {
  return window.Int8Array && window.Int8Array.prototype.sort ? 46 : window.Node.innerText ? 45 : window.Document.charset ? 44 : window.Array.prototype.includes ? 43 : "undefined" === typeof window.Reflect ? 42 : 41;
};
BrowserData$$module$Environment$BrowserData.OperaVersion = function $BrowserData$$module$Environment$BrowserData$OperaVersion$() {
  return 1;
};
BrowserData$$module$Environment$BrowserData.OperaMiniVersion = function $BrowserData$$module$Environment$BrowserData$OperaMiniVersion$() {
  return 8;
};
BrowserData$$module$Environment$BrowserData.ChromeVersion = function $BrowserData$$module$Environment$BrowserData$ChromeVersion$() {
  return 45;
};
BrowserData$$module$Environment$BrowserData.SafariVersion = function $BrowserData$$module$Environment$BrowserData$SafariVersion$() {
  return window.CSS.supports ? 9 : 8;
};
BrowserData$$module$Environment$BrowserData.SafariIosVersion = function $BrowserData$$module$Environment$BrowserData$SafariIosVersion$() {
  return 8.4;
};
BrowserData$$module$Environment$BrowserData.EdgeVersion = function $BrowserData$$module$Environment$BrowserData$EdgeVersion$() {
  return window.Symbol && window.JSON && "{}" === window.JSON.stringify({foo:window.Symbol()}) ? 13 : window.RTCIceGatherOptions ? 11 : 12;
};
BrowserData$$module$Environment$BrowserData.AndroidVersion = function $BrowserData$$module$Environment$BrowserData$AndroidVersion$() {
  return 4.3;
};
BrowserData$$module$Environment$BrowserData.AndroidChromeVersion = function $BrowserData$$module$Environment$BrowserData$AndroidChromeVersion$() {
  return 47;
};
module$Environment$BrowserData.BROWSER_IE = BROWSER_IE$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_EDGE = BROWSER_EDGE$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_FIREFOX = BROWSER_FIREFOX$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_OPERA = BROWSER_OPERA$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_OPERA_MINI = BROWSER_OPERA_MINI$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_SAFARI = BROWSER_SAFARI$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_SAFARI_IOS = BROWSER_SAFARI_IOS$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_CHROME = BROWSER_CHROME$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_CHROME_ANDROID = BROWSER_CHROME_ANDROID$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_ANDROID = BROWSER_ANDROID$$module$Environment$BrowserData;
module$Environment$BrowserData.BROWSER_UNKNOWN = BROWSER_UNKNOWN$$module$Environment$BrowserData;
module$Environment$BrowserData.BrowserData = BrowserData$$module$Environment$BrowserData;
var module$Environment$Browser = {}, BROWSER_NAME$$module$Environment$Browser = BrowserData$$module$Environment$BrowserData.BrowserName(), BROWSER_VERSION$$module$Environment$Browser = BrowserData$$module$Environment$BrowserData.BrowserVersion(BROWSER_NAME$$module$Environment$Browser), Browser$$module$Environment$Browser = function $Browser$$module$Environment$Browser$() {
};
Browser$$module$Environment$Browser.toString = function $Browser$$module$Environment$Browser$toString$() {
  return this.name + " " + this.version;
};
Object.defineProperties(Browser$$module$Environment$Browser, {version:{configurable:!0, enumerable:!0, get:function() {
  return BROWSER_VERSION$$module$Environment$Browser;
}}, name:{configurable:!0, enumerable:!0, get:function() {
  return BROWSER_NAME$$module$Environment$Browser;
}}});
module$Environment$Browser.Browser = Browser$$module$Environment$Browser;
var module$Algorithms$Numbers$Numbers = {}, Numbers$$module$Algorithms$Numbers$Numbers = function $Numbers$$module$Algorithms$Numbers$Numbers$() {
};
Numbers$$module$Algorithms$Numbers$Numbers.ToNumber = function $Numbers$$module$Algorithms$Numbers$Numbers$ToNumber$($value$$, $defaultValue$$) {
  var $num$$ = +$value$$;
  return $num$$ == $value$$ && $num$$ === $num$$ ? $num$$ : void 0 === $defaultValue$$ ? 0 : $defaultValue$$;
};
Numbers$$module$Algorithms$Numbers$Numbers.Magnitude = function $Numbers$$module$Algorithms$Numbers$Numbers$Magnitude$($num$$, $base$$) {
  $num$$ = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber($num$$) | 0;
  var $pow_width$$ = ((0 > $num$$ ? -$num$$ : $num$$) | 0).toString($base$$).length - 1 || 1, $pow_width$$ = Math.pow($base$$, $pow_width$$);
  return 0 > $num$$ ? Math.floor($num$$ / $pow_width$$) * $pow_width$$ : Math.ceil($num$$ / $pow_width$$) * $pow_width$$;
};
module$Algorithms$Numbers$Numbers.Numbers = Numbers$$module$Algorithms$Numbers$Numbers;
var module$Algorithms$Arrays$Arrays = {}, MAX_CHUNK_SIZE$$module$Algorithms$Arrays$Arrays = 8192, ARRAY_PROTOTYPE$$module$Algorithms$Arrays$Arrays = window.Array.prototype, ARRAY_SLICE$$module$Algorithms$Arrays$Arrays = ARRAY_PROTOTYPE$$module$Algorithms$Arrays$Arrays.slice, ARRAY_PUSH$$module$Algorithms$Arrays$Arrays = ARRAY_PROTOTYPE$$module$Algorithms$Arrays$Arrays.push, ARRAY$$module$Algorithms$Arrays$Arrays = window.Array, Arrays$$module$Algorithms$Arrays$Arrays = function $Arrays$$module$Algorithms$Arrays$Arrays$() {
};
Arrays$$module$Algorithms$Arrays$Arrays.ToArray = function $Arrays$$module$Algorithms$Arrays$Arrays$ToArray$($value$$, $defaultValue$$) {
  return ARRAY$$module$Algorithms$Arrays$Arrays.isArray($value$$) ? $value$$ : $defaultValue$$;
};
Arrays$$module$Algorithms$Arrays$Arrays.Slice = function $Arrays$$module$Algorithms$Arrays$Arrays$Slice$($array$$, $sliceArgs$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 1;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 1] = arguments[$$jscomp$restIndex$$];
  }
  $array$$ = void 0 === $array$$ ? [] : $array$$;
  try {
    $array$$ = ARRAY_SLICE$$module$Algorithms$Arrays$Arrays.apply($array$$, $$jscomp$restParams$$);
  } catch ($error$$) {
    $array$$ = [];
  }
  return $array$$;
};
Arrays$$module$Algorithms$Arrays$Arrays.WidePush = function $Arrays$$module$Algorithms$Arrays$Arrays$WidePush$($intoArray$$, $fromArray$$) {
  for (var $i$$ = 0, $end$$ = $fromArray$$.length;$i$$ < $end$$;$i$$ += MAX_CHUNK_SIZE$$module$Algorithms$Arrays$Arrays) {
    var $chunk$$ = window.Math.min($i$$ + MAX_CHUNK_SIZE$$module$Algorithms$Arrays$Arrays, $end$$), $chunk$$ = Arrays$$module$Algorithms$Arrays$Arrays.Slice($fromArray$$, $i$$, $chunk$$);
    ARRAY_PUSH$$module$Algorithms$Arrays$Arrays.apply($intoArray$$, $chunk$$);
  }
};
Arrays$$module$Algorithms$Arrays$Arrays.SortArrayObjects = function $Arrays$$module$Algorithms$Arrays$Arrays$SortArrayObjects$($array$$, $ascending$$, $fields$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 2;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 2] = arguments[$$jscomp$restIndex$$];
  }
  $array$$ = Arrays$$module$Algorithms$Arrays$Arrays.ToArray($array$$);
  $array$$.sort(Arrays$$module$Algorithms$Arrays$Arrays.GetBestSortArrayObjectFunction($ascending$$, $$jscomp$restParams$$));
  return $array$$;
};
Arrays$$module$Algorithms$Arrays$Arrays.GetBestSortArrayObjectFunction = function $Arrays$$module$Algorithms$Arrays$Arrays$GetBestSortArrayObjectFunction$($ascending$$, $fields$$) {
  switch(Browser$$module$Environment$Browser.name) {
    case module$Environment$BrowserData.BROWSER_FIREFOX:
      return function($left$$, $right$$) {
        for (var $i$$ = 0;$left$$ && $right$$ && $i$$ < $fields$$.length;++$i$$) {
          $left$$ = $left$$[$fields$$[$i$$]], $right$$ = $right$$[$fields$$[$i$$]];
        }
        return $ascending$$ ? $left$$ >= $right$$ : $left$$ <= $right$$;
      };
    default:
      return function($left$$, $right$$) {
        for (var $a$$1_i$$ = 0;$left$$ && $right$$ && $a$$1_i$$ < $fields$$.length;++$a$$1_i$$) {
          $left$$ = $left$$[$fields$$[$a$$1_i$$]], $right$$ = $right$$[$fields$$[$a$$1_i$$]];
        }
        var $a$$1_i$$ = $ascending$$ ? $left$$ : $right$$, $b$$ = $ascending$$ ? $right$$ : $left$$;
        return $a$$1_i$$ > $b$$ ? 1 : $a$$1_i$$ < $b$$ ? -1 : 0;
      };
  }
};
Arrays$$module$Algorithms$Arrays$Arrays.prototype.SortArrayNumbers = function $Arrays$$module$Algorithms$Arrays$Arrays$$SortArrayNumbers$($array$$, $ascending$$) {
  $array$$ = Arrays$$module$Algorithms$Arrays$Arrays.ToArray($array$$);
  $array$$.sort(function($left$$, $right$$) {
    $left$$ = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber($left$$);
    $right$$ = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber($right$$);
    return $ascending$$ ? $left$$ - $right$$ : $right$$ - $left$$;
  });
  return $array$$;
};
module$Algorithms$Arrays$Arrays.Arrays = Arrays$$module$Algorithms$Arrays$Arrays;
var module$Algorithms$Arrays$ArraysInterface = {}, ArraysInterface$$module$Algorithms$Arrays$ArraysInterface = function $ArraysInterface$$module$Algorithms$Arrays$ArraysInterface$() {
};
ArraysInterface$$module$Algorithms$Arrays$ArraysInterface.prototype.array = function $ArraysInterface$$module$Algorithms$Arrays$ArraysInterface$$array$($value$$, $defaultValue$$) {
  $defaultValue$$ = void 0 === $defaultValue$$ ? [] : $defaultValue$$;
  return Arrays$$module$Algorithms$Arrays$Arrays.ToArray($value$$, $defaultValue$$);
};
ArraysInterface$$module$Algorithms$Arrays$ArraysInterface.prototype.sliceArray = function $ArraysInterface$$module$Algorithms$Arrays$ArraysInterface$$sliceArray$($array$$, $index$$) {
  $array$$ = void 0 === $array$$ ? [] : $array$$;
  return Arrays$$module$Algorithms$Arrays$Arrays.SliceArray($array$$, void 0 === $index$$ ? 0 : $index$$);
};
ArraysInterface$$module$Algorithms$Arrays$ArraysInterface.prototype.joinArray = function $ArraysInterface$$module$Algorithms$Arrays$ArraysInterface$$joinArray$($arrayRef$$, $arraysFrom$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$6_i$$ = 1;$$jscomp$restIndex$$6_i$$ < arguments.length;++$$jscomp$restIndex$$6_i$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$6_i$$ - 1] = arguments[$$jscomp$restIndex$$6_i$$];
  }
  for ($$jscomp$restIndex$$6_i$$ = 0;$$jscomp$restIndex$$6_i$$ < $$jscomp$restParams$$.length;++$$jscomp$restIndex$$6_i$$) {
    Arrays$$module$Algorithms$Arrays$Arrays.WidePush($arrayRef$$, $$jscomp$restParams$$[$$jscomp$restIndex$$6_i$$]);
  }
  return $arrayRef$$;
};
ArraysInterface$$module$Algorithms$Arrays$ArraysInterface.prototype.sortArrayObj = function $ArraysInterface$$module$Algorithms$Arrays$ArraysInterface$$sortArrayObj$($array$$, $ascending$$, $fields$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 2;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 2] = arguments[$$jscomp$restIndex$$];
  }
  return Arrays$$module$Algorithms$Arrays$Arrays.SortArrayObjects.apply(Arrays$$module$Algorithms$Arrays$Arrays, [].concat([$array$$, void 0 === $ascending$$ ? !0 : $ascending$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
};
ArraysInterface$$module$Algorithms$Arrays$ArraysInterface.prototype.sortArrayNum = function $ArraysInterface$$module$Algorithms$Arrays$ArraysInterface$$sortArrayNum$($array$$, $ascending$$) {
  return Arrays$$module$Algorithms$Arrays$Arrays.SortArrayNumbers($array$$, void 0 === $ascending$$ ? !0 : $ascending$$);
};
module$Algorithms$Arrays$ArraysInterface.ArraysInterface = ArraysInterface$$module$Algorithms$Arrays$ArraysInterface;
var module$Algorithms$Booleans$Booleans = {}, Booleans$$module$Algorithms$Booleans$Booleans = function $Booleans$$module$Algorithms$Booleans$Booleans$() {
};
Booleans$$module$Algorithms$Booleans$Booleans.ToBoolean = function $Booleans$$module$Algorithms$Booleans$Booleans$ToBoolean$($value$$, $defaultValue$$) {
  $defaultValue$$ = void 0 === $defaultValue$$ ? !1 : $defaultValue$$;
  switch(typeof $value$$) {
    case "boolean":
      return $value$$;
    case "undefined":
      return $defaultValue$$;
    case "string":
      return /^true$/i.test($value$$) ? !0 : /^false$/i.test($value$$) ? !1 : $defaultValue$$;
    case "number":
      return 0 !== $value$$;
  }
  return $value$$ ? !0 : $defaultValue$$;
};
module$Algorithms$Booleans$Booleans.Booleans = Booleans$$module$Algorithms$Booleans$Booleans;
var module$Algorithms$Booleans$BooleansInterface = {}, BooleansInterface$$module$Algorithms$Booleans$BooleansInterface = function $BooleansInterface$$module$Algorithms$Booleans$BooleansInterface$() {
};
BooleansInterface$$module$Algorithms$Booleans$BooleansInterface.prototype.bool = function $BooleansInterface$$module$Algorithms$Booleans$BooleansInterface$$bool$($value$$, $defaultValue$$) {
};
module$Algorithms$Booleans$BooleansInterface.BooleansInterface = BooleansInterface$$module$Algorithms$Booleans$BooleansInterface;
var module$Algorithms$Dates$Dates = {}, Dates$$module$Algorithms$Dates$Dates = function $Dates$$module$Algorithms$Dates$Dates$() {
};
module$Algorithms$Dates$Dates.Dates = Dates$$module$Algorithms$Dates$Dates;
var module$Algorithms$Dates$DatesInterface = {}, DatesInterface$$module$Algorithms$Dates$DatesInterface = function $DatesInterface$$module$Algorithms$Dates$DatesInterface$() {
};
DatesInterface$$module$Algorithms$Dates$DatesInterface.prototype.date = function $DatesInterface$$module$Algorithms$Dates$DatesInterface$$date$($value$$, $defaultValue$$) {
};
module$Algorithms$Dates$DatesInterface.DatesInterface = DatesInterface$$module$Algorithms$Dates$DatesInterface;
var module$Algorithms$Functions$Functions = {}, Functions$$module$Algorithms$Functions$Functions = function $Functions$$module$Algorithms$Functions$Functions$() {
};
Functions$$module$Algorithms$Functions$Functions.IsFunction = function $Functions$$module$Algorithms$Functions$Functions$IsFunction$($checkFunction$$) {
  return "function" === typeof $checkFunction$$;
};
Functions$$module$Algorithms$Functions$Functions.Use = function $Functions$$module$Algorithms$Functions$Functions$Use$($context$$, $useFunction$$, $args$$) {
  $context$$ = $context$$ || null;
  if (Functions$$module$Algorithms$Functions$Functions.IsFunction($useFunction$$)) {
    return $useFunction$$.apply($context$$, $args$$);
  }
};
Functions$$module$Algorithms$Functions$Functions.Run = function $Functions$$module$Algorithms$Functions$Functions$Run$($runFunction$$, $args$$) {
  if (Functions$$module$Algorithms$Functions$Functions.IsFunction($runFunction$$)) {
    return $runFunction$$.apply(null, [].concat($jscomp.arrayFromIterable($args$$)));
  }
};
Functions$$module$Algorithms$Functions$Functions.Bind = function $Functions$$module$Algorithms$Functions$Functions$Bind$($context$$, $useFunction$$, $args$$) {
  $args$$ = void 0 === $args$$ ? [] : $args$$;
  $args$$ = Arrays$$module$Algorithms$Arrays$Arrays.Slice($args$$);
  return function() {
    $args$$ = $args$$.concat(Arrays$$module$Algorithms$Arrays$Arrays.Slice(arguments));
    return Functions$$module$Algorithms$Functions$Functions.Use($context$$, $useFunction$$, $args$$);
  };
};
module$Algorithms$Functions$Functions.Functions = Functions$$module$Algorithms$Functions$Functions;
var module$Algorithms$Functions$FunctionsInterface = {}, FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface = function $FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface$() {
};
FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface.prototype.use = function $FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface$$use$($context$$, $functionReference$$, $argsArray$$) {
};
FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface.prototype.run = function $FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface$$run$($functionReference$$, $argsArray$$) {
};
FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface.prototype.bindFn = function $FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface$$bindFn$($context$$, $functionReference$$, $argsArray$$) {
};
module$Algorithms$Functions$FunctionsInterface.FunctionsInterface = FunctionsInterface$$module$Algorithms$Functions$FunctionsInterface;
var module$Algorithms$Objects$ObjectsInterface = {}, Objects$$module$Algorithms$Objects$ObjectsInterface = function $Objects$$module$Algorithms$Objects$ObjectsInterface$() {
};
Objects$$module$Algorithms$Objects$ObjectsInterface.prototype.object = function $Objects$$module$Algorithms$Objects$ObjectsInterface$$object$($value$$, $defaultValue$$) {
};
Objects$$module$Algorithms$Objects$ObjectsInterface.prototype.mergeObj = function $Objects$$module$Algorithms$Objects$ObjectsInterface$$mergeObj$($base$$, $subs$$) {
};
Objects$$module$Algorithms$Objects$ObjectsInterface.prototype.cloneObj = function $Objects$$module$Algorithms$Objects$ObjectsInterface$$cloneObj$($object$$) {
};
Objects$$module$Algorithms$Objects$ObjectsInterface.prototype.deepCloneObj = function $Objects$$module$Algorithms$Objects$ObjectsInterface$$deepCloneObj$($object$$) {
};
Objects$$module$Algorithms$Objects$ObjectsInterface.prototype.property = function $Objects$$module$Algorithms$Objects$ObjectsInterface$$property$($object$$, $levels$$) {
};
module$Algorithms$Objects$ObjectsInterface.Objects = Objects$$module$Algorithms$Objects$ObjectsInterface;
var module$JSObject = {}, JSObject$$module$JSObject = function $JSObject$$module$JSObject$() {
};
JSObject$$module$JSObject.inPrototypeChain = function $JSObject$$module$JSObject$inPrototypeChain$($object$$) {
  return this.prototype.isPrototypeOf($object$$);
};
JSObject$$module$JSObject.prototype.extend = function $JSObject$$module$JSObject$$extend$($name$$, $property$$) {
  Object.defineProperty(this, $name$$, {value:$property$$});
  return this;
};
JSObject$$module$JSObject.prototype.extendFn = function $JSObject$$module$JSObject$$extendFn$($name$$, $property$$, $args$$) {
  $property$$ = Functions$$module$Algorithms$Functions$Functions.Use(this, $property$$, $args$$);
  return this.extend($name$$, $property$$);
};
JSObject$$module$JSObject.prototype.use = function $JSObject$$module$JSObject$$use$($functionDefinition$$, $args$$) {
  $args$$ = void 0 === $args$$ ? [] : $args$$;
  Functions$$module$Algorithms$Functions$Functions.Use(this, $functionDefinition$$, $args$$);
  return this;
};
JSObject$$module$JSObject.Mix = function $JSObject$$module$JSObject$Mix$($Subs$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$8_i$$ = 0;$$jscomp$restIndex$$8_i$$ < arguments.length;++$$jscomp$restIndex$$8_i$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$8_i$$ - 0] = arguments[$$jscomp$restIndex$$8_i$$];
  }
  for ($$jscomp$restIndex$$8_i$$ = 0;$$jscomp$restIndex$$8_i$$ < $$jscomp$restParams$$.length;++$$jscomp$restIndex$$8_i$$) {
    for (var $sub$$ = $$jscomp$restParams$$[$$jscomp$restIndex$$8_i$$], $properties$$ = Object.getOwnPropertyNames($sub$$.prototype), $j$$ = 0;$j$$ < $properties$$.length;++$j$$) {
      var $property$$ = $properties$$[$j$$];
      "constructor" !== $property$$ && Object.defineProperty(this.prototype, $property$$, Object.getOwnPropertyDescriptor($sub$$.prototype, $property$$));
    }
  }
  return this;
};
Object.defineProperties(JSObject$$module$JSObject.prototype, {prototype:{configurable:!0, enumerable:!0, get:function() {
  return this.constructor.prototype;
}}});
module$JSObject.JSObject = JSObject$$module$JSObject;
var module$Algorithms$KeyCodes$KeyCodesInterface = {}, KeyCodesInterface$$module$Algorithms$KeyCodes$KeyCodesInterface = function $KeyCodesInterface$$module$Algorithms$KeyCodes$KeyCodesInterface$() {
};
Object.defineProperties(KeyCodesInterface$$module$Algorithms$KeyCodes$KeyCodesInterface.prototype, {keycodes:{configurable:!0, enumerable:!0, get:function() {
}}});
module$Algorithms$KeyCodes$KeyCodesInterface.KeyCodesInterface = KeyCodesInterface$$module$Algorithms$KeyCodes$KeyCodesInterface;
var module$Algorithms$Looper$LooperController = {}, LoopController$$module$Algorithms$Looper$LooperController = function $LoopController$$module$Algorithms$Looper$LooperController$($source$$) {
  $source$$ = void 0 === $source$$ ? [] : $source$$;
  this._break = !1;
  this._index = 0;
  this._source = $source$$;
  Object.defineProperty(this, "_source", {value:this._source});
};
$jscomp.inherits(LoopController$$module$Algorithms$Looper$LooperController, JSObject$$module$JSObject);
LoopController$$module$Algorithms$Looper$LooperController.Mix = JSObject$$module$JSObject.Mix;
LoopController$$module$Algorithms$Looper$LooperController.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
LoopController$$module$Algorithms$Looper$LooperController.prototype.stop = function $LoopController$$module$Algorithms$Looper$LooperController$$stop$() {
  this._break = !0;
  return this;
};
LoopController$$module$Algorithms$Looper$LooperController.prototype.drop = function $LoopController$$module$Algorithms$Looper$LooperController$$drop$($dropCount$$) {
  return this;
};
Object.defineProperties(LoopController$$module$Algorithms$Looper$LooperController.prototype, {breaking:{configurable:!0, enumerable:!0, get:function() {
  return !0 === this._break;
}}, index:{configurable:!0, enumerable:!0, get:function() {
  return this._index;
}, set:function($index$$) {
  this._index = $index$$;
}}});
var ObjectLoopController$$module$Algorithms$Looper$LooperController = function $ObjectLoopController$$module$Algorithms$Looper$LooperController$($var_args$$) {
  LoopController$$module$Algorithms$Looper$LooperController.apply(this, arguments);
};
$jscomp.inherits(ObjectLoopController$$module$Algorithms$Looper$LooperController, LoopController$$module$Algorithms$Looper$LooperController);
ObjectLoopController$$module$Algorithms$Looper$LooperController.Mix = LoopController$$module$Algorithms$Looper$LooperController.Mix;
ObjectLoopController$$module$Algorithms$Looper$LooperController.inPrototypeChain = LoopController$$module$Algorithms$Looper$LooperController.inPrototypeChain;
var ArrayLoopController$$module$Algorithms$Looper$LooperController = function $ArrayLoopController$$module$Algorithms$Looper$LooperController$($args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
  }
  LoopController$$module$Algorithms$Looper$LooperController.call.apply(LoopController$$module$Algorithms$Looper$LooperController, [].concat([this], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
};
$jscomp.inherits(ArrayLoopController$$module$Algorithms$Looper$LooperController, LoopController$$module$Algorithms$Looper$LooperController);
ArrayLoopController$$module$Algorithms$Looper$LooperController.Mix = LoopController$$module$Algorithms$Looper$LooperController.Mix;
ArrayLoopController$$module$Algorithms$Looper$LooperController.inPrototypeChain = LoopController$$module$Algorithms$Looper$LooperController.inPrototypeChain;
ArrayLoopController$$module$Algorithms$Looper$LooperController.prototype.drop = function $ArrayLoopController$$module$Algorithms$Looper$LooperController$$drop$($dropCount$$) {
  $dropCount$$ = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber(void 0 === $dropCount$$ ? 1 : $dropCount$$, 1);
  this._source.splice(this.index--, $dropCount$$);
  return this;
};
Object.defineProperties(ArrayLoopController$$module$Algorithms$Looper$LooperController.prototype, {index:{configurable:!0, enumerable:!0, set:function($index$$) {
  this._index = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber($index$$);
}, get:function() {
  return this._index;
}}});
module$Algorithms$Looper$LooperController.LoopController = LoopController$$module$Algorithms$Looper$LooperController;
module$Algorithms$Looper$LooperController.ObjectLoopController = ObjectLoopController$$module$Algorithms$Looper$LooperController;
module$Algorithms$Looper$LooperController.ArrayLoopController = ArrayLoopController$$module$Algorithms$Looper$LooperController;
var module$Algorithms$Looper$Looper = {}, Looper$$module$Algorithms$Looper$Looper = function $Looper$$module$Algorithms$Looper$Looper$() {
};
Looper$$module$Algorithms$Looper$Looper.ObjectEach = function $Looper$$module$Algorithms$Looper$Looper$ObjectEach$($object$$, $loopFunction$$, $data$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 2;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 2] = arguments[$$jscomp$restIndex$$];
  }
  if ($object$$ && "object" === typeof $object$$) {
    var $$jscomp$restIndex$$ = new ObjectLoopController$$module$Algorithms$Looper$LooperController($object$$), $key$$;
    for ($key$$ in $object$$) {
      if ($$jscomp$restIndex$$.breaking) {
        break;
      }
      $$jscomp$restIndex$$.index = $key$$;
      Functions$$module$Algorithms$Functions$Functions.Use($$jscomp$restIndex$$, $loopFunction$$, [].concat([$object$$[$key$$], $key$$, $object$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
    }
  }
};
Looper$$module$Algorithms$Looper$Looper.ArrayEach = function $Looper$$module$Algorithms$Looper$Looper$ArrayEach$($array$$, $loopFunction$$, $data$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$11_controller$$ = 2;$$jscomp$restIndex$$11_controller$$ < arguments.length;++$$jscomp$restIndex$$11_controller$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$11_controller$$ - 2] = arguments[$$jscomp$restIndex$$11_controller$$];
  }
  if ($array$$ && "object" === typeof $array$$) {
    for ($$jscomp$restIndex$$11_controller$$ = new ArrayLoopController$$module$Algorithms$Looper$LooperController($array$$), $$jscomp$restIndex$$11_controller$$.index = 0;$$jscomp$restIndex$$11_controller$$.index < $array$$.length && !$$jscomp$restIndex$$11_controller$$.breaking;++$$jscomp$restIndex$$11_controller$$.index) {
      Functions$$module$Algorithms$Functions$Functions.Use($$jscomp$restIndex$$11_controller$$, $loopFunction$$, [].concat([$array$$[$$jscomp$restIndex$$11_controller$$.index], $$jscomp$restIndex$$11_controller$$.index, $array$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
    }
  }
};
Looper$$module$Algorithms$Looper$Looper.Iterate = function $Looper$$module$Algorithms$Looper$Looper$Iterate$($start$$, $end$$, $iterator$$, $data$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$12_controller$$ = 3;$$jscomp$restIndex$$12_controller$$ < arguments.length;++$$jscomp$restIndex$$12_controller$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$12_controller$$ - 3] = arguments[$$jscomp$restIndex$$12_controller$$];
  }
  $start$$ = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber($start$$);
  $end$$ = Numbers$$module$Algorithms$Numbers$Numbers.ToNumber($end$$);
  for (var $$jscomp$restIndex$$12_controller$$ = new LoopController$$module$Algorithms$Looper$LooperController(null), $step$$ = $end$$ < $start$$ ? -1 : 1, $i$$ = $start$$;$i$$ !== $end$$ && !$$jscomp$restIndex$$12_controller$$.breaking;$i$$ += $step$$) {
    Functions$$module$Algorithms$Functions$Functions.Use($$jscomp$restIndex$$12_controller$$, $iterator$$, [].concat([$i$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
  }
};
module$Algorithms$Looper$Looper.Looper = Looper$$module$Algorithms$Looper$Looper;
var module$Algorithms$Numbers$NumbersInterface = {}, NumbersInterface$$module$Algorithms$Numbers$NumbersInterface = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$() {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.magnitude = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$magnitude$($num$$, $base$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.number = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$number$($value$$, $defaultValue$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.min = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$min$($numbers$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.max = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$max$($numbers$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.byte = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$byte$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.ubyte = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$ubyte$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.short = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$short$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.ushort = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$ushort$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.int = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$int$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.uint = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$uint$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.float = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$float$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.double = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$double$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.makeEnum = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$makeEnum$($value$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.rad2deg = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$rad2deg$($number$$, $defaultValue$$) {
};
NumbersInterface$$module$Algorithms$Numbers$NumbersInterface.prototype.deg2rad = function $NumbersInterface$$module$Algorithms$Numbers$NumbersInterface$$deg2rad$($number$$, $defaultValue$$) {
};
module$Algorithms$Numbers$NumbersInterface.NumbersInterface = NumbersInterface$$module$Algorithms$Numbers$NumbersInterface;
var module$Algorithms$Strings$StringsInterface = {}, StringsInterface$$module$Algorithms$Strings$StringsInterface = function $StringsInterface$$module$Algorithms$Strings$StringsInterface$() {
};
StringsInterface$$module$Algorithms$Strings$StringsInterface.prototype.string = function $StringsInterface$$module$Algorithms$Strings$StringsInterface$$string$($value$$, $defaultValue$$) {
};
StringsInterface$$module$Algorithms$Strings$StringsInterface.prototype.escapeString = function $StringsInterface$$module$Algorithms$Strings$StringsInterface$$escapeString$($stringToEscape$$) {
};
module$Algorithms$Strings$StringsInterface.StringsInterface = StringsInterface$$module$Algorithms$Strings$StringsInterface;
var module$Algorithms$Strings$Strings = {}, CONST_REGEXP_UNSAFE_CHARACTERS$$module$Algorithms$Strings$Strings = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, CONST_STRING_UNSAFE_REPLACEMENT$$module$Algorithms$Strings$Strings = "\\$&", CONST_REGEXP_TO_STRING_MATCH$$module$Algorithms$Strings$Strings = /^\/(.*)\/[a-z]*$/, Strings$$module$Algorithms$Strings$Strings = function $Strings$$module$Algorithms$Strings$Strings$() {
};
Strings$$module$Algorithms$Strings$Strings.ToString = function $Strings$$module$Algorithms$Strings$Strings$ToString$($value$$, $defaultValue$$) {
  return "string" === typeof $value$$ ? $value$$ : $value$$ && "function" === typeof $value$$.toString ? $value$$.toString() : null !== $value$$ && "object" === typeof $value$$ && $value$$.isPrototypeOf(RegExp) ? ("" + $value$$).match(CONST_REGEXP_TO_STRING_MATCH$$module$Algorithms$Strings$Strings, "$1") : $value$$ || 0 === $value$$ ? "" + $value$$ : $defaultValue$$ || $value$$;
};
Strings$$module$Algorithms$Strings$Strings.EscapeString = function $Strings$$module$Algorithms$Strings$Strings$EscapeString$($stringToEscape$$) {
  return Strings$$module$Algorithms$Strings$Strings.ToString($stringToEscape$$).replace(CONST_REGEXP_UNSAFE_CHARACTERS$$module$Algorithms$Strings$Strings, CONST_STRING_UNSAFE_REPLACEMENT$$module$Algorithms$Strings$Strings);
};
module$Algorithms$Strings$Strings.Strings = Strings$$module$Algorithms$Strings$Strings;
var module$Algorithms$Objects$Objects = {}, Objects$$module$Algorithms$Objects$Objects = function $Objects$$module$Algorithms$Objects$Objects$() {
};
module$Algorithms$Objects$Objects.Objects = Objects$$module$Algorithms$Objects$Objects;
var module$Algorithms$Looper$LooperInterface = {}, LooperInterface$$module$Algorithms$Looper$LooperInterface = function $LooperInterface$$module$Algorithms$Looper$LooperInterface$() {
};
LooperInterface$$module$Algorithms$Looper$LooperInterface.prototype.each = function $LooperInterface$$module$Algorithms$Looper$LooperInterface$$each$($object$$, $loopFunction$$, $data$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 2;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 2] = arguments[$$jscomp$restIndex$$];
  }
  Looper$$module$Algorithms$Looper$Looper.ObjectEach.apply(Looper$$module$Algorithms$Looper$Looper, [].concat([$object$$, $loopFunction$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
  return this;
};
LooperInterface$$module$Algorithms$Looper$LooperInterface.prototype.arrEach = function $LooperInterface$$module$Algorithms$Looper$LooperInterface$$arrEach$($array$$, $loopFunction$$, $data$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 2;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 2] = arguments[$$jscomp$restIndex$$];
  }
  Looper$$module$Algorithms$Looper$Looper.ArrayEach.apply(Looper$$module$Algorithms$Looper$Looper, [].concat([$array$$, $loopFunction$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
  return this;
};
LooperInterface$$module$Algorithms$Looper$LooperInterface.prototype.iterate = function $LooperInterface$$module$Algorithms$Looper$LooperInterface$$iterate$($start$$, $end$$, $iterator$$, $data$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 3;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 3] = arguments[$$jscomp$restIndex$$];
  }
  Looper$$module$Algorithms$Looper$Looper.Iterate.apply(Looper$$module$Algorithms$Looper$Looper, [].concat([$start$$, $end$$, $iterator$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
  return this;
};
module$Algorithms$Looper$LooperInterface.LooperInterface = LooperInterface$$module$Algorithms$Looper$LooperInterface;
var module$Algorithms$KeyCodes$KeyCodes = {}, KeyCodes$$module$Algorithms$KeyCodes$KeyCodes = {KC_Backspace:8, KC_Tab:9, KC_Enter:13, KC_Shift:16, KC_Ctrl:17, KC_Alt:18, KC_Pause:19, KC_Break:19, KC_CapsLock:20, KC_Escape:27, KC_Space:32, KC_PageUp:33, KC_PageDown:34, KC_End:35, KC_Home:36, KC_LeftArrow:37, KC_UpArrow:38, KC_RightArrow:39, KC_DownArrow:40, KC_Insert:45, KC_Delete:46, KC_0:48, KC_1:49, KC_2:50, KC_3:51, KC_4:52, KC_5:53, KC_6:54, KC_7:55, KC_8:56, KC_9:57, KC_A:65, KC_B:66, KC_C:67, 
KC_D:68, KC_E:69, KC_F:70, KC_G:71, KC_H:72, KC_I:73, KC_J:74, KC_K:75, KC_L:76, KC_M:77, KC_N:78, KC_O:79, KC_P:80, KC_Q:81, KC_R:82, KC_S:83, KC_T:84, KC_U:85, KC_V:86, KC_W:87, KC_X:88, KC_Y:89, KC_Z:90, KC_LWin:91, KC_RWin:92, KC_Select:93, KC_Num0:96, KC_Num1:97, KC_Num2:98, KC_Num3:99, KC_Num4:100, KC_Num5:101, KC_Num6:102, KC_Num7:103, KC_Num8:104, KC_Num9:105, KC_NumAsterisk:106, KC_NumPlus:107, KC_NumMinus:109, KC_NumPeriod:110, KC_NumSlash:111, KC_F1:112, KC_F2:113, KC_F3:114, KC_F4:115, 
KC_F5:116, KC_F6:117, KC_F7:118, KC_F8:119, KC_F9:120, KC_F10:121, KC_F11:122, KC_F12:123, KC_NumLock:144, KC_ScrollLock:145, KC_SemiColon:186, KC_Equal:187, KC_Comma:188, KC_Dash:189, KC_Period:190, KC_FSlash:191, KC_BSlash:220, KC_Grave:192, KC_LBracket:219, KC_RBracket:221, KC_Apos:222};
module$Algorithms$KeyCodes$KeyCodes.KeyCodes = KeyCodes$$module$Algorithms$KeyCodes$KeyCodes;
var module$Algorithms$JSAlgorithms = {}, JSAlgorithms$$module$Algorithms$JSAlgorithms = function $JSAlgorithms$$module$Algorithms$JSAlgorithms$($var_args$$) {
  JSObject$$module$JSObject.apply(this, arguments);
};
$jscomp.inherits(JSAlgorithms$$module$Algorithms$JSAlgorithms, JSObject$$module$JSObject);
JSAlgorithms$$module$Algorithms$JSAlgorithms.Mix = JSObject$$module$JSObject.Mix;
JSAlgorithms$$module$Algorithms$JSAlgorithms.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSAlgorithms$$module$Algorithms$JSAlgorithms.prototype.use = function $JSAlgorithms$$module$Algorithms$JSAlgorithms$$use$($context$$, $functionReference$$, $argsArray$$) {
  $argsArray$$ = void 0 === $argsArray$$ ? [] : $argsArray$$;
  return Functions$$module$Algorithms$Functions$Functions.Use($context$$, $functionReference$$, $argsArray$$);
};
JSAlgorithms$$module$Algorithms$JSAlgorithms.prototype.run = function $JSAlgorithms$$module$Algorithms$JSAlgorithms$$run$($functionReference$$, $argsArray$$) {
  $argsArray$$ = void 0 === $argsArray$$ ? [] : $argsArray$$;
  return Functions$$module$Algorithms$Functions$Functions.Run($functionReference$$, $argsArray$$);
};
JSAlgorithms$$module$Algorithms$JSAlgorithms.prototype.bindFn = function $JSAlgorithms$$module$Algorithms$JSAlgorithms$$bindFn$($context$$, $functionReference$$, $args$$) {
  $args$$ = void 0 === $args$$ ? [] : $args$$;
  return Functions$$module$Algorithms$Functions$Functions.Bind($context$$, $functionReference$$, $args$$);
};
JSAlgorithms$$module$Algorithms$JSAlgorithms.prototype.magnitude = function $JSAlgorithms$$module$Algorithms$JSAlgorithms$$magnitude$($num$$, $base$$) {
  return Numbers$$module$Algorithms$Numbers$Numbers.Magnitude($num$$, void 0 === $base$$ ? 10 : $base$$);
};
JSAlgorithms$$module$Algorithms$JSAlgorithms.Mix(LooperInterface$$module$Algorithms$Looper$LooperInterface);
module$Algorithms$JSAlgorithms.JSAlgorithms = JSAlgorithms$$module$Algorithms$JSAlgorithms;
var module$Dom$DOMCss = {}, DOMCss$$module$Dom$DOMCss = function $DOMCss$$module$Dom$DOMCss$() {
};
DOMCss$$module$Dom$DOMCss.setCssOn = function $DOMCss$$module$Dom$DOMCss$setCssOn$($element$$, $cssObject$$) {
  return Looper$$module$Algorithms$Looper$Looper.ObjectEach($cssObject$$, function($value$$, $property$$, $cssObject$$) {
    $element$$.style[$property$$] = $value$$;
  });
};
DOMCss$$module$Dom$DOMCss.setCssOnLoop = function $DOMCss$$module$Dom$DOMCss$setCssOnLoop$($element$$, $index$$, $elementList$$, $cssObject$$) {
  return DOMCss$$module$Dom$DOMCss.setCssOn($element$$, $cssObject$$);
};
DOMCss$$module$Dom$DOMCss.getCssFrom = function $DOMCss$$module$Dom$DOMCss$getCssFrom$($element$$, $cssObject$$0$$) {
  var $computedStyle$$ = window.getComputedStyle($element$$), $elementStyle$$ = $element$$.style;
  Looper$$module$Algorithms$Looper$Looper.ObjectEach($cssObject$$0$$, function($value$$, $property$$, $cssObject$$) {
    $cssObject$$[$property$$] = $elementStyle$$[$property$$] || $computedStyle$$[$property$$];
  });
  return $cssObject$$0$$;
};
DOMCss$$module$Dom$DOMCss.getCssFromLoop = function $DOMCss$$module$Dom$DOMCss$getCssFromLoop$($element$$, $index$$, $elementList$$, $JSDom$$, $cssObject$$, $callbackFunction$$) {
  0 < $index$$ && ($cssObject$$ = Object.create($cssObject$$));
  DOMCss$$module$Dom$DOMCss.getCssFrom($element$$, $cssObject$$);
  new $JSDom$$($element$$, $callbackFunction$$, [$cssObject$$]);
};
module$Dom$DOMCss.DOMCss = DOMCss$$module$Dom$DOMCss;
var module$Object$Interface = {}, HasInterface$$module$Object$Interface = function $HasInterface$$module$Object$Interface$() {
};
HasInterface$$module$Object$Interface.prototype.GetInterface = function $HasInterface$$module$Object$Interface$$GetInterface$() {
};
module$Object$Interface.HasInterface = HasInterface$$module$Object$Interface;
var module$Registry$RegistryInterface = {}, RegistryInterface$$module$Registry$RegistryInterface = function $RegistryInterface$$module$Registry$RegistryInterface$() {
};
RegistryInterface$$module$Registry$RegistryInterface.prototype.fetch = function $RegistryInterface$$module$Registry$RegistryInterface$$fetch$($key$$, $callback$$) {
};
RegistryInterface$$module$Registry$RegistryInterface.prototype.stash = function $RegistryInterface$$module$Registry$RegistryInterface$$stash$($key$$, $value$$) {
};
module$Registry$RegistryInterface.RegistryInterface = RegistryInterface$$module$Registry$RegistryInterface;
var module$Error$JSError = {}, JSError$$module$Error$JSError = function $JSError$$module$Error$JSError$($message$$, $fileName_prefix$$, $lineNumber$$) {
  $message$$ = void 0 === $message$$ ? "" : $message$$;
  module$Environment$BrowserData.BROWSER_FIREFOX === Browser$$module$Environment$Browser.name ? Error.call(this, $message$$, $fileName_prefix$$, $lineNumber$$) : ($fileName_prefix$$ && ($fileName_prefix$$ = "" + $fileName_prefix$$, $lineNumber$$ && ($fileName_prefix$$ += ":" + $lineNumber$$), $message$$ = "[" + $fileName_prefix$$ + "] " + $message$$), Error.call(this, $message$$));
};
$jscomp.inherits(JSError$$module$Error$JSError, Error);
JSError$$module$Error$JSError.captureStackTrace = Error.captureStackTrace;
module$Error$JSError.JSError = JSError$$module$Error$JSError;
var module$Registry$RegistryInterfaceDefs = {}, ERROR_REGISTRY_INTERFACE$$module$Registry$RegistryInterfaceDefs = "Attempted to use abstract class RegistryInterface", RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs = function $RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs$($var_args$$) {
  JSObject$$module$JSObject.apply(this, arguments);
};
$jscomp.inherits(RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs, JSObject$$module$JSObject);
RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs.Mix = JSObject$$module$JSObject.Mix;
RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs.prototype.fetch = function $RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs$$fetch$($key$$, $callback$$) {
  throw new JSError$$module$Error$JSError(ERROR_REGISTRY_INTERFACE$$module$Registry$RegistryInterfaceDefs);
};
RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs.prototype.stash = function $RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs$$stash$($key$$, $value$$) {
  throw new JSError$$module$Error$JSError(ERROR_REGISTRY_INTERFACE$$module$Registry$RegistryInterfaceDefs);
};
module$Registry$RegistryInterfaceDefs.RegistryInterfaceDefs = RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs;
var module$Registry$JSRegistry = {}, JSRegistry$$module$Registry$JSRegistry = function $JSRegistry$$module$Registry$JSRegistry$($cache$$) {
  this._cache = $cache$$ = void 0 === $cache$$ ? {} : $cache$$;
};
$jscomp.inherits(JSRegistry$$module$Registry$JSRegistry, JSObject$$module$JSObject);
JSRegistry$$module$Registry$JSRegistry.Mix = JSObject$$module$JSObject.Mix;
JSRegistry$$module$Registry$JSRegistry.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSRegistry$$module$Registry$JSRegistry.prototype.GetInterface = function $JSRegistry$$module$Registry$JSRegistry$$GetInterface$() {
  var $registry$$ = this, $JSRegistryInterface$$ = function $$JSRegistryInterface$$$() {
  };
  $jscomp.inherits($JSRegistryInterface$$, RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs);
  $JSRegistryInterface$$.Mix = RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs.Mix;
  $JSRegistryInterface$$.inPrototypeChain = RegistryInterfaceDefs$$module$Registry$RegistryInterfaceDefs.inPrototypeChain;
  $JSRegistryInterface$$.prototype.fetch = function $$JSRegistryInterface$$$$fetch$($key$$, $callback$$) {
    return $registry$$.Fetch($key$$, void 0 === $callback$$ ? null : $callback$$);
  };
  $JSRegistryInterface$$.prototype.stash = function $$JSRegistryInterface$$$$stash$($key$$, $value$$) {
    return $registry$$.Stash($key$$, void 0 === $value$$ ? null : $value$$);
  };
  return new $JSRegistryInterface$$;
};
JSRegistry$$module$Registry$JSRegistry.prototype.Fetch = function $JSRegistry$$module$Registry$JSRegistry$$Fetch$($key$$, $callback$$) {
  var $value$$ = {key:$key$$, value:this._cache[$key$$]};
  Functions$$module$Algorithms$Functions$Functions.Run($callback$$, $value$$);
  return $value$$.value;
};
JSRegistry$$module$Registry$JSRegistry.prototype.Stash = function $JSRegistry$$module$Registry$JSRegistry$$Stash$($key$$, $value$$) {
  return this._cache[$key$$] = $value$$;
};
module$Registry$JSRegistry.JSRegistry = JSRegistry$$module$Registry$JSRegistry;
var module$Dom$DOMElement = {}, REGEX_DOM_TAG$$module$Dom$DOMElement = /^(\s|\n)*(\\\<|\<)/, HTML_ELEMENT_EXISTS$$module$Dom$DOMElement = "object" === typeof window.HTMLElement, DOMElement$$module$Dom$DOMElement = function $DOMElement$$module$Dom$DOMElement$() {
};
DOMElement$$module$Dom$DOMElement.toElement = function $DOMElement$$module$Dom$DOMElement$toElement$($source$$) {
  return DOMElement$$module$Dom$DOMElement.isElement($source$$) ? [$source$$] : "string" === typeof $source$$ ? DOMElement$$module$Dom$DOMElement.isDomString($source$$) ? DOMElement$$module$Dom$DOMElement.parseHtmlAsNodes($source$$) : DOMElement$$module$Dom$DOMElement.querySelectorAll($source$$) : Arrays$$module$Algorithms$Arrays$Arrays.Slice($source$$);
};
DOMElement$$module$Dom$DOMElement.isElement = function $DOMElement$$module$Dom$DOMElement$isElement$($element$$) {
  return $element$$ && (HTML_ELEMENT_EXISTS$$module$Dom$DOMElement && $element$$ instanceof window.HTMLElement || "object" === typeof $element$$ && 1 === $element$$.nodeType && "string" === typeof $element$$.nodeName) ? !0 : !1;
};
DOMElement$$module$Dom$DOMElement.isDomString = function $DOMElement$$module$Dom$DOMElement$isDomString$($match_source$$) {
  if ("string" !== typeof $match_source$$) {
    return !1;
  }
  $match_source$$ = $match_source$$.match(REGEX_DOM_TAG$$module$Dom$DOMElement);
  return null !== $match_source$$ && -1 < $match_source$$.indexOf("<");
};
DOMElement$$module$Dom$DOMElement.parseHtmlAsNodes = function $DOMElement$$module$Dom$DOMElement$parseHtmlAsNodes$($source$$) {
  var $div$$ = window.document.createElement("div");
  $div$$.innerHTML = $source$$;
  return Arrays$$module$Algorithms$Arrays$Arrays.Slice($div$$.children, 0);
};
DOMElement$$module$Dom$DOMElement.querySelectorAll = function $DOMElement$$module$Dom$DOMElement$querySelectorAll$($selector$$, $parent$$) {
  $parent$$ = void 0 === $parent$$ ? window.document : $parent$$;
  try {
    return Arrays$$module$Algorithms$Arrays$Arrays.Slice($parent$$.querySelectorAll($selector$$));
  } catch ($e$$) {
    return [];
  }
};
DOMElement$$module$Dom$DOMElement.attachRegistry = function $DOMElement$$module$Dom$DOMElement$attachRegistry$($element$$) {
  $element$$.__jsRegistry || ($element$$.__jsRegistry = (new JSRegistry$$module$Registry$JSRegistry).GetInterface());
};
module$Dom$DOMElement.DOMElement = DOMElement$$module$Dom$DOMElement;
var module$Dom$JSDom = {}, JSDom$$module$Dom$JSDom = function $JSDom$$module$Dom$JSDom$($element$$, $callbackFunction$$, $argumentArray$$) {
  $callbackFunction$$ = void 0 === $callbackFunction$$ ? null : $callbackFunction$$;
  $argumentArray$$ = void 0 === $argumentArray$$ ? [] : $argumentArray$$;
  JSDom$$module$Dom$JSDom.inPrototypeChain($element$$) || ($element$$ = DOMElement$$module$Dom$DOMElement.toElement($element$$));
  this._element = $element$$;
  this.extend("_element", this._element);
  this.each(DOMElement$$module$Dom$DOMElement.attachRegistry);
  this.use($callbackFunction$$, $argumentArray$$);
};
$jscomp.inherits(JSDom$$module$Dom$JSDom, JSObject$$module$JSObject);
JSDom$$module$Dom$JSDom.Mix = JSObject$$module$JSObject.Mix;
JSDom$$module$Dom$JSDom.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSDom$$module$Dom$JSDom.prototype.each = function $JSDom$$module$Dom$JSDom$$each$($iteratorFunction$$, $args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 1;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 1] = arguments[$$jscomp$restIndex$$];
  }
  Looper$$module$Algorithms$Looper$Looper.ArrayEach.apply(Looper$$module$Algorithms$Looper$Looper, [].concat([this._element, $iteratorFunction$$], $jscomp.arrayFromIterable($$jscomp$restParams$$)));
  return this;
};
JSDom$$module$Dom$JSDom.prototype.setCss = function $JSDom$$module$Dom$JSDom$$setCss$($cssObject$$, $callbackFunction$$) {
  $cssObject$$ = void 0 === $cssObject$$ ? {} : $cssObject$$;
  this.each(DOMCss$$module$Dom$DOMCss.setCssOnLoop, $cssObject$$);
  this.use($callbackFunction$$, [$cssObject$$]);
  return this;
};
JSDom$$module$Dom$JSDom.prototype.getCss = function $JSDom$$module$Dom$JSDom$$getCss$($cssObject$$, $callbackFunction$$) {
  $cssObject$$ = void 0 === $cssObject$$ ? {} : $cssObject$$;
  this.each(DOMCss$$module$Dom$DOMCss.getCssFromLoop, JSDom$$module$Dom$JSDom, $cssObject$$, $callbackFunction$$);
  return this;
};
Object.defineProperties(JSDom$$module$Dom$JSDom.prototype, {count:{configurable:!0, enumerable:!0, get:function() {
  return this._element.length;
}}});
module$Dom$JSDom.JSDom = JSDom$$module$Dom$JSDom;
var module$Version = {}, VERSION_OBJECT$$module$Version = {MAJOR_VERSION:0, MINOR_VERSION:2, PATCH_VERSION:0}, DEBUG$$module$Version = !0;
module$Version.VERSION_OBJECT = VERSION_OBJECT$$module$Version;
module$Version.DEBUG = DEBUG$$module$Version;
var module$Environment$JSEnvironment = {}, VERSION_STRING$$module$Environment$JSEnvironment = module$Version.VERSION_OBJECT.MAJOR_VERSION + "." + module$Version.VERSION_OBJECT.MINOR_VERSION + "." + module$Version.VERSION_OBJECT.PATCH_VERSION, VERSION_NUMBER$$module$Environment$JSEnvironment = (module$Version.VERSION_OBJECT.MAJOR_VERSION << 16) + (module$Version.VERSION_OBJECT.MINOR_VERSION << 8) + module$Version.VERSION_OBJECT.PATCH_VERSION, JSEnvironment$$module$Environment$JSEnvironment = function $JSEnvironment$$module$Environment$JSEnvironment$($var_args$$) {
  JSObject$$module$JSObject.apply(this, arguments);
};
$jscomp.inherits(JSEnvironment$$module$Environment$JSEnvironment, JSObject$$module$JSObject);
JSEnvironment$$module$Environment$JSEnvironment.Mix = JSObject$$module$JSObject.Mix;
JSEnvironment$$module$Environment$JSEnvironment.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSEnvironment$$module$Environment$JSEnvironment.toString = function $JSEnvironment$$module$Environment$JSEnvironment$toString$() {
  return "JSpyder " + this.version + " on " + this.browser;
};
Object.defineProperties(JSEnvironment$$module$Environment$JSEnvironment, {version:{configurable:!0, enumerable:!0, get:function() {
  return VERSION_STRING$$module$Environment$JSEnvironment;
}}, versionNo:{configurable:!0, enumerable:!0, get:function() {
  return VERSION_NUMBER$$module$Environment$JSEnvironment;
}}, browser:{configurable:!0, enumerable:!0, get:function() {
  return Browser$$module$Environment$Browser;
}}});
module$Environment$JSEnvironment.JSEnvironment = JSEnvironment$$module$Environment$JSEnvironment;
var module$Logger$LoggerDefs = {}, ERROR_REGISTRY_INTERFACE$$module$Logger$LoggerDefs = "Attempted to use abstract class RegistryInterface", LoggerDefs$$module$Logger$LoggerDefs = function $LoggerDefs$$module$Logger$LoggerDefs$($var_args$$) {
  Function.apply(this, arguments);
};
$jscomp.inherits(LoggerDefs$$module$Logger$LoggerDefs, Function);
LoggerDefs$$module$Logger$LoggerDefs.warn = function $LoggerDefs$$module$Logger$LoggerDefs$warn$($args$$) {
  for (var $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
  }
  throw new JSError$$module$Error$JSError(ERROR_REGISTRY_INTERFACE$$module$Logger$LoggerDefs);
};
LoggerDefs$$module$Logger$LoggerDefs.err = function $LoggerDefs$$module$Logger$LoggerDefs$err$($args$$) {
  for (var $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
  }
  throw new JSError$$module$Error$JSError(ERROR_REGISTRY_INTERFACE$$module$Logger$LoggerDefs);
};
module$Logger$LoggerDefs.LoggerDefs = LoggerDefs$$module$Logger$LoggerDefs;
var module$Logger$JSLogger = {}, JSLogger$$module$Logger$JSLogger = function $JSLogger$$module$Logger$JSLogger$() {
};
$jscomp.inherits(JSLogger$$module$Logger$JSLogger, JSObject$$module$JSObject);
JSLogger$$module$Logger$JSLogger.Mix = JSObject$$module$JSObject.Mix;
JSLogger$$module$Logger$JSLogger.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSLogger$$module$Logger$JSLogger.prototype.GetInterface = function $JSLogger$$module$Logger$JSLogger$$GetInterface$() {
  function $Logger$$($args$$) {
    for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
      $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
    }
    JSLogger$$module$Logger$JSLogger.Log.apply(JSLogger$$module$Logger$JSLogger, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
  }
  $Logger$$.warn = JSLogger$$module$Logger$JSLogger.Warn;
  $Logger$$.err = JSLogger$$module$Logger$JSLogger.Err;
  return $Logger$$;
};
JSLogger$$module$Logger$JSLogger.Log = function $JSLogger$$module$Logger$JSLogger$Log$($args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
  }
  return console && console.log.apply(console, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
};
JSLogger$$module$Logger$JSLogger.Warn = function $JSLogger$$module$Logger$JSLogger$Warn$($args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
  }
  return console && (console.warn ? console.warn.apply(console, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$))) : JSLogger$$module$Logger$JSLogger.Log.apply(JSLogger$$module$Logger$JSLogger, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$))));
};
JSLogger$$module$Logger$JSLogger.Err = function $JSLogger$$module$Logger$JSLogger$Err$($args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
  }
  return console && (console.warn ? console.error.apply(console, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$))) : JSLogger$$module$Logger$JSLogger.Warn.apply(JSLogger$$module$Logger$JSLogger, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$))));
};
module$Logger$JSLogger.JSLogger = JSLogger$$module$Logger$JSLogger;
var module$Library$LibraryInterfaceDefs = {}, ABSTRACT_ERROR$$module$Library$LibraryInterfaceDefs = "LibraryInterfaceDefs is an abstract function!", FILENAME$$module$Library$LibraryInterfaceDefs = "JSpyder/Library/LibraryInterfaceDefs", LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs = function $LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs$($var_args$$) {
  Function.apply(this, arguments);
};
$jscomp.inherits(LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs, Function);
LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs.register = function $LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs$register$($args$$) {
};
LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs.registerSet = function $LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs$registerSet$($args$$) {
};
LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs.execute = function $LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs$execute$($args$$) {
};
module$Library$LibraryInterfaceDefs.LibraryInterfaceDefs = LibraryInterfaceDefs$$module$Library$LibraryInterfaceDefs;
var module$Library$JSLibrary = {}, JSLibrary$$module$Library$JSLibrary = function $JSLibrary$$module$Library$JSLibrary$($context$$) {
  $context$$ = void 0 === $context$$ ? {} : $context$$;
  this._registry = (new JSRegistry$$module$Registry$JSRegistry).GetInterface();
  this._context = $context$$;
};
$jscomp.inherits(JSLibrary$$module$Library$JSLibrary, JSObject$$module$JSObject);
JSLibrary$$module$Library$JSLibrary.Mix = JSObject$$module$JSObject.Mix;
JSLibrary$$module$Library$JSLibrary.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSLibrary$$module$Library$JSLibrary.prototype.GetInterface = function $JSLibrary$$module$Library$JSLibrary$$GetInterface$() {
  function $JSLibraryInterface$$($args$$) {
    for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
      $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
    }
    $jsLibrary$$.Execute.apply($jsLibrary$$, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
    return $JSLibraryInterface$$;
  }
  var $jsLibrary$$ = this;
  $JSLibraryInterface$$.register = function $$JSLibraryInterface$$$register$($args$$) {
    for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
      $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
    }
    $jsLibrary$$.Register.apply($jsLibrary$$, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
    return $JSLibraryInterface$$;
  };
  $JSLibraryInterface$$.registerSet = function $$JSLibraryInterface$$$registerSet$($args$$) {
    for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
      $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
    }
    $jsLibrary$$.RegisterSet.apply($jsLibrary$$, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
    return $JSLibraryInterface$$;
  };
  $JSLibraryInterface$$.execute = function $$JSLibraryInterface$$$execute$($args$$) {
    for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
      $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
    }
    return $jsLibrary$$.Execute.apply($jsLibrary$$, [].concat($jscomp.arrayFromIterable($$jscomp$restParams$$)));
  };
  return $JSLibraryInterface$$;
};
JSLibrary$$module$Library$JSLibrary.prototype.Execute = function $JSLibrary$$module$Library$JSLibrary$$Execute$($functionName_lookupFunction$$, $argumentArray$$, $callbackFunction$$, $callbackArguments$$) {
  $argumentArray$$ = void 0 === $argumentArray$$ ? [] : $argumentArray$$;
  $callbackFunction$$ = void 0 === $callbackFunction$$ ? null : $callbackFunction$$;
  $callbackArguments$$ = void 0 === $callbackArguments$$ ? [] : $callbackArguments$$;
  $argumentArray$$ = Arrays$$module$Algorithms$Arrays$Arrays.Slice($argumentArray$$);
  $callbackArguments$$ = Arrays$$module$Algorithms$Arrays$Arrays.Slice($callbackArguments$$);
  $functionName_lookupFunction$$ = this._registry.fetch($functionName_lookupFunction$$);
  var $returnValue$$ = null, $returnValue$$ = Functions$$module$Algorithms$Functions$Functions.Use(this._context, $functionName_lookupFunction$$, $argumentArray$$);
  Functions$$module$Algorithms$Functions$Functions.Use(this._context, $callbackFunction$$, [].concat([$returnValue$$], $jscomp.arrayFromIterable($callbackArguments$$)));
  return $returnValue$$;
};
JSLibrary$$module$Library$JSLibrary.prototype.Register = function $JSLibrary$$module$Library$JSLibrary$$Register$($functionName$$, $functionValue$$) {
  $functionValue$$ = void 0 === $functionValue$$ ? null : $functionValue$$;
  "string" === typeof $functionName$$ && ("function" !== typeof $functionValue$$ && null !== $functionValue$$ || this._registry.stash($functionName$$, $functionValue$$));
};
JSLibrary$$module$Library$JSLibrary.prototype.RegisterSet = function $JSLibrary$$module$Library$JSLibrary$$RegisterSet$($object$$) {
  var $$jscomp$this$$ = this;
  $object$$ && "object" === typeof $object$$ && Looper$$module$Algorithms$Looper$Looper.ObjectEach($object$$, function($fnValue$$, $fnName$$) {
    $$jscomp$this$$.Register($fnName$$, $fnValue$$);
  });
};
module$Library$JSLibrary.JSLibrary = JSLibrary$$module$Library$JSLibrary;
var module$JSCore = {}, JS_LOGGER_INTERFACE$$module$JSCore = (new JSLogger$$module$Logger$JSLogger).GetInterface(), JSCore$$module$JSCore = function $JSCore$$module$JSCore$() {
  this.extend("registry", (new JSRegistry$$module$Registry$JSRegistry).GetInterface());
  this.extend("lib", (new JSLibrary$$module$Library$JSLibrary(this)).GetInterface());
  this.extend("alg", new JSAlgorithms$$module$Algorithms$JSAlgorithms(this));
};
$jscomp.inherits(JSCore$$module$JSCore, JSObject$$module$JSObject);
JSCore$$module$JSCore.Mix = JSObject$$module$JSObject.Mix;
JSCore$$module$JSCore.inPrototypeChain = JSObject$$module$JSObject.inPrototypeChain;
JSCore$$module$JSCore.Bootstrap = function $JSCore$$module$JSCore$Bootstrap$($alias$$, $global$$) {
  $global$$ = void 0 === $global$$ ? window : $global$$;
  return $global$$[void 0 === $alias$$ ? "jspyder" : $alias$$] = new JSCore$$module$JSCore;
};
JSCore$$module$JSCore.prototype.dom = function $JSCore$$module$JSCore$$dom$($args$$) {
  for (var $$jscomp$restParams$$ = [], $$jscomp$restIndex$$ = 0;$$jscomp$restIndex$$ < arguments.length;++$$jscomp$restIndex$$) {
    $$jscomp$restParams$$[$$jscomp$restIndex$$ - 0] = arguments[$$jscomp$restIndex$$];
  }
  return new (Function.prototype.bind.apply(JSDom$$module$Dom$JSDom, [null].concat($jscomp.arrayFromIterable($$jscomp$restParams$$))));
};
Object.defineProperties(JSCore$$module$JSCore.prototype, {alg:{configurable:!0, enumerable:!0, get:function() {
  return JSAlgorithms$$module$Algorithms$JSAlgorithms;
}}, env:{configurable:!0, enumerable:!0, get:function() {
  return JSEnvironment$$module$Environment$JSEnvironment;
}}, log:{configurable:!0, enumerable:!0, get:function() {
  return JS_LOGGER_INTERFACE$$module$JSCore;
}}});
window.JSpyder || (window.JSpyder = JSCore$$module$JSCore);
module$JSCore.JSCore = JSCore$$module$JSCore;

