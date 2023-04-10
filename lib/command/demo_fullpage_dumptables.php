<?php

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

final class rex_command_demo_fullpage_dumptables extends rex_console_command
{
    protected function configure(): void
    {
        $this->setDescription('Dumps the Fullpage-Demo-Tables to backups/demo_fullpage.sql');
        $this->addOption('yes', 'y', InputOption::VALUE_NONE, 'Overwrite existing file backups/demo_fullpage.sql?');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = $this->getStyle($input, $output);

        $skipConfirmation = true === $input->getOption('yes');

        $io->title('Fullpage-Demo - Dump Tables');

        if (!$input->isInteractive() && !$skipConfirmation) {
            return 1;
        }

        if (!$skipConfirmation && !$io->confirm('Current file backups/demo_fullpage.sql will be overwritten. Would you like to proceed?')) {
            return 1;
        }

        $io->writeln('Run dump Fullpage-Demo-Tables ...');

        $errors = rex_demo_fullpage::dump_tables();

        if ([] !== $errors) {
            $io->error($this->decodeMessage("Failed to dump Fullpage-Demo-Tables:\n- " . implode("\n- ", $errors)));
            return 1;
        }

        $io->success('Successfully dumped Fullpage-Demo-Tables!');
        return 0;
    }
}
