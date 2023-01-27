<?php

// Stand 27.01.2023

$finder = PhpCsFixer\Finder::create()
    ->in([__DIR__]);

return (new PhpCsFixer\Config())
    ->setUsingCache(true)
    ->setRiskyAllowed(true)
    ->setRules([
        '@Symfony' => true,
        '@Symfony:risky' => false,
        '@PHP81Migration' => true,
        '@PHP80Migration:risky' => false,
        '@PHPUnit84Migration:risky' => false,
        'align_multiline_comment' => true,
        'array_indentation' => true,
        'blank_line_before_statement' => false,
        'braces' => false,
        'comment_to_phpdoc' => true,
        'compact_nullable_typehint' => true,
        'concat_space' => false,
        'control_structure_braces' => true,
        'control_structure_continuation_position' => true,
        'curly_braces_position' => [
            'allow_single_line_anonymous_functions' => false,
        ],
        'declare_parentheses' => true,
        'declare_strict_types' => false,
        'echo_tag_syntax' => false,
        'empty_loop_condition' => false,
        'escape_implicit_backslashes' => true,
        'global_namespace_import' => [
            'import_constants' => true,
            'import_functions' => true,
            'import_classes' => true,
        ],
        'heredoc_to_nowdoc' => true,
        'list_syntax' => ['syntax' => 'short'],
        'method_argument_space' => ['on_multiline' => 'ignore'],
        'multiline_comment_opening_closing' => true,
        'native_constant_invocation' => false,
        'no_alternative_syntax' => false,
        'no_blank_lines_after_phpdoc' => false,
        'no_extra_blank_lines' => true,
        'no_multiple_statements_per_line' => true,
        'no_null_property_initialization' => true,
        'no_superfluous_elseif' => true,
        'no_unreachable_default_argument_value' => true,
        'no_useless_else' => true,
        'no_useless_return' => true,
        'ordered_class_elements' => ['order' => [
            'use_trait',
            'constant_public',
            'constant_protected',
            'constant_private',
            'property',
            'construct',
            'phpunit',
            'method',
        ]],
        'ordered_imports' => ['imports_order' => [
            'class',
            'function',
            'const',
        ]],
        'php_unit_internal_class' => true,
        'php_unit_test_case_static_method_calls' => true,
        'phpdoc_align' => false,
        'phpdoc_no_package' => false,
        'phpdoc_order' => true,
        'phpdoc_separation' => false,
        'phpdoc_to_comment' => false,
        'phpdoc_types_order' => false,
        'phpdoc_var_annotation_correct_order' => true,
        'psr_autoloading' => false,
        'semicolon_after_instruction' => false,
        'single_space_after_construct' => true,
        'static_lambda' => true,
        'trailing_comma_in_multiline' => [
            'after_heredoc' => true,
            'elements' => ['arguments', 'arrays', 'match', 'parameters'],
        ],
        'use_arrow_functions' => false,
        'void_return' => false,

        // ConstructorEmptyBracesFixer::name() => true,
        // MultilinePromotedPropertiesFixer::name() => true,
        'statement_indentation' => true,

    ])
    ->setFinder($finder)
;
