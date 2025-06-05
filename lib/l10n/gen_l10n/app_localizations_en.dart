import 'app_localizations.dart';

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get helloWorld => 'Hello, world!';

  @override
  String get title1 => 'Unprofessional Metronome';

  @override
  String get title2 => 'Random Solfège Generator';

  @override
  String get stop => 'Stop';

  @override
  String get start => 'Start';

  @override
  String get randomNumberTitle => 'Random Syllable Names';

  @override
  String get showSingName => 'Show syllable names';

  @override
  String get musicalAlphabet => 'musicalAlphabet';

  @override
  String get groups => 'How Many Groups';

  @override
  String get numbersPerGroup => 'How Many Numbers per Group';
}
