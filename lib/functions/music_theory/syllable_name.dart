import 'dart:math';
import 'package:beat/l10n/gen_l10n/app_localizations.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class RandomNumberGeneratorPage extends StatefulWidget {
  const RandomNumberGeneratorPage({super.key});

  @override
  _RandomNumberGeneratorPageState createState() =>
      _RandomNumberGeneratorPageState();
}

class _RandomNumberGeneratorPageState extends State<RandomNumberGeneratorPage> {
  final TextEditingController _nController = TextEditingController(text: '5');
  final TextEditingController _mController = TextEditingController(text: '7');
  bool syllable = false;
  List<List<int>> _randomNumbers = [];

  void _generateRandomNumbers() {
    final int n = int.tryParse(_nController.text) ?? 1;
    final int m = int.tryParse(_mController.text) ?? 1;
    final Random random = Random();

    setState(() {
      _randomNumbers = List.generate(n, (_) {
        return List.generate(m, (_) => random.nextInt(7) + 1);
      });
    });
  }

  @override
  void initState() {
    _generateRandomNumbers();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(AppLocalizations.of(context).title2),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _nController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: '${AppLocalizations.of(context).groups} (N)',
                      border: const OutlineInputBorder(),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: TextField(
                    controller: _mController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText:
                          '${AppLocalizations.of(context).numbersPerGroup}(M)',
                      border: const OutlineInputBorder(),
                    ),
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(AppLocalizations.of(context).showSingName),
                      CupertinoSwitch(
                        thumbColor: Colors.brown,
                        trackColor: Colors.brown.shade100,
                        activeColor: Colors.orange,
                        value: syllable,
                        onChanged: (bool value) {
                          setState(() {
                            syllable = value;
                          });
                        },
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            const SizedBox(height: 16),
            Expanded(
              child: ListView.builder(
                itemCount: _randomNumbers.length,
                shrinkWrap: true,
                itemExtent: 100,
                itemBuilder: (context, index) {
                  return Center(
                    child: ListView.builder(
                        shrinkWrap: true,
                        itemCount: _randomNumbers[index].length,
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (c, i) {
                          return Number(
                            number: _randomNumbers[index][i].toString(),
                            syllable: syllable,
                          );
                        }),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _generateRandomNumbers,
        child: const Icon(Icons.refresh),
      ),
    );
  }
}

class Number extends StatelessWidget {
  final double numberSize;
  final double syllableSize;
  final String number;
  final bool syllable;

  const Number({
    super.key,
    this.numberSize = 30,
    this.syllableSize = 14,
    required this.number,
    required this.syllable,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          child: Text(
            number,
            style: TextStyle(
              fontSize: numberSize,
              fontWeight: FontWeight.bold,
              color: Colors.orange,
              backgroundColor: Colors.white12,
            ),
          ),
        ),
        Visibility(
          visible: syllable,
          child: Text(
            numberToSyllable(number),
            style: TextStyle(
              fontSize: syllableSize,
              fontWeight: FontWeight.bold,
              color: Colors.brown,
              backgroundColor: Colors.white12,
            ),
          ),
        )
      ],
    );
  }

  String numberToSyllable(String number) {
    const Map<String, String> syllable = {
      '1': 'Do',
      '2': 'Re',
      '3': 'Mi',
      '4': 'Fa',
      '5': 'Sol',
      '6': 'La',
      '7': 'Si',
    };

    return syllable[number] ?? '未知';
  }
}
