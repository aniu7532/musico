import 'app_localizations.dart';

/// The translations for Spanish Castilian (`es`).
class AppLocalizationsEs extends AppLocalizations {
  AppLocalizationsEs([String locale = 'es']) : super(locale);

  @override
  String get helloWorld => '¡Hola, mundo!';

  @override
  String get title1 => 'Metrónomo no profesional';

  @override
  String get title2 => 'Generador aleatorio de solfeo';

  @override
  String get stop => 'Detener';

  @override
  String get start => 'Iniciar';

  @override
  String get randomNumberTitle => 'Generador de números aleatorios';

  @override
  String get showSingName => 'Mostrar solfeo';

  @override
  String get musicalAlphabet => 'musicalAlphabet';

  @override
  String get groups => 'How Many Groups';

  @override
  String get numbersPerGroup => 'How Many Numbers per Group';
}
