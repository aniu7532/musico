import 'package:beat/functions/music_theory/syllable_name.dart';
import 'package:beat/l10n/gen_l10n/app_localizations.dart';
import 'package:flutter/material.dart';

import 'functions/metronome/metronome.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      supportedLocales: AppLocalizations.supportedLocales,
      title: '',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<String> items = [];
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    items.clear();
    items.add(AppLocalizations.of(context).title1);
    items.add(AppLocalizations.of(context).title2);
    return SafeArea(
      child: Scaffold(
        body: Flex(
          direction: orientation == Orientation.portrait
              ? Axis.vertical // 竖屏时垂直滚动
              : Axis.horizontal, // 横屏时水平滚动,
          children: items.map((e) {
            final functionName = e;
            Widget? gotoPage;
            return Expanded(
              child: Container(
                width: double.infinity,
                color: Colors.deepPurple,
                child: InkWell(
                  onTap: () {
                    if (functionName == AppLocalizations.of(context).title1) {
                      gotoPage = const MetronomePage();
                    } else if (functionName ==
                        AppLocalizations.of(context).title2) {
                      gotoPage = const RandomNumberGeneratorPage();
                    }
                    Navigator.of(context).push(
                      MaterialPageRoute(builder: (context) => gotoPage!),
                    );
                  },
                  child: Card(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Image.asset(
                          functionName == AppLocalizations.of(context).title2
                              ? "assets/images/syllable_name_icon.png"
                              : "assets/images/metronome_icon.png",
                          color: Colors.deepPurple.shade300,
                          width: 50,
                        ),
                        const SizedBox(
                          width: 10,
                          height: 10,
                        ),
                        Text(functionName)
                      ],
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
