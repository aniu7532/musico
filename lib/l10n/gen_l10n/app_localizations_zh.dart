import 'app_localizations.dart';

/// The translations for Chinese (`zh`).
class AppLocalizationsZh extends AppLocalizations {
  AppLocalizationsZh([String locale = 'zh']) : super(locale);

  @override
  String get helloWorld => '你好 世界!';

  @override
  String get title1 => '不专业的节拍器';

  @override
  String get title2 => '随机唱名生产器';

  @override
  String get stop => '停止';

  @override
  String get start => '开始';

  @override
  String get randomNumberTitle => '随机唱名生成器';

  @override
  String get showSingName => '展示唱名';

  @override
  String get musicalAlphabet => '音名';

  @override
  String get groups => '有几组';

  @override
  String get numbersPerGroup => '每组多少数字';
}
