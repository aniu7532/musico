import 'package:beat/functions/music_theory/syllable_name.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';

import 'functions/metronome/metronome.dart';

void main() async {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'title',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();

  final List<String> items = ["节拍器", "随机唱名生成"];
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: GridView.builder(
          itemCount: widget.items.length,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 10),
          itemBuilder: (c, i) {
            final functionName = widget.items[i];
            Widget? gotoPage;
            return InkWell(
              onTap: () {
                switch (functionName) {
                  case "节拍器":
                    gotoPage = MetronomePage();
                    break;
                  case "随机唱名生成":
                    gotoPage = const RandomNumberGeneratorPage();
                }

                Navigator.of(context).push(
                  MaterialPageRoute(builder: (context) => gotoPage!),
                );
              },
              child: Card(
                child: Column(
                  children: [
                    const Icon(Icons.music_note),
                    Text(functionName.tr())
                  ],
                ),
              ),
            );
          }),
    );
  }
}
